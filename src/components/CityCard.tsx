import React, { useEffect, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import OpenWeather from '../api/openWeather.api';
import { useAppDispatch } from '../hooks';
import { setCity, toggleMenu } from '../store/slices/weather.slice';

interface CityCardProps {
  city: LocalStorageMyCity
}

const CityCard: React.FC<CityCardProps> = (props) => {
  const dispatch = useAppDispatch();

  const { city } = props;
  const { lat, lon } = city;

  const [weather, setWeather] = useState<GetCurrentWeatherResponse>();
  const [backgroundColor, setBackgroundColor] = useState<'day' | 'night'>('day');

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: city.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
  };

  const handleClickCityCard = () => {
    dispatch(setCity({
      name: city.name,
      country: city.country,
      lat: city.lat,
      lon: city.lon
    }));
    dispatch(toggleMenu({}));
  }

  useEffect(() => {
    (async () => {
      const currentWeather = await OpenWeather.getCurrentWeather({ lat, lon });
      const cityTime = new Date((currentWeather.dt + currentWeather.timezone) * 1000).getUTCHours();
      setWeather(currentWeather);
      setBackgroundColor(cityTime >= 6 && cityTime < 18 ? 'day' : 'night');
    })()
  }, [lat, lon])

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} className={`bg-blend-lighten p-3 rounded-2xl bg-gray-100 bg-opacity-10 backdrop-filter backdrop-blur-sm drop-shadow-lg mb-2 first:mt-2 cursor-pointer ${backgroundColor === 'day' ? 'bg-gradient-to-t from-sky-800 via-sky-650 to-sky-500' : 'bg-gradient-to-t from-slate-950 via-indigo-950 to-blue-900'}`} style={style} onClick={handleClickCityCard}>
      <div className='flex mb-6'>
        <div className='grow'>
          <p aria-label='city' className='text-2xl font-medium'>{city.name}</p>
          <p aria-label='country'>{city.country}</p>
        </div>
        <p aria-label='main temperature' className='text-3xl font-bold'>{weather?.main.temp.toFixed()}°C</p>
      </div>

      <div className='flex gap-2'>
        <div className='grow'>{weather?.weather[0].description}</div>
        <div>H: {weather?.main.temp_max.toFixed()}°C</div>
        <div>L: {weather?.main.temp_min.toFixed()}°C</div>
      </div>
    </div>
  )
}

export default CityCard