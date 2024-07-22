import React, { useEffect } from 'react'
import { weatherIcon } from '../utils';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setBackgroundColor, setCurrentWeather } from '../store/slices/weather.slice';
import OpenWeather from '../api/openWeather.api';

interface CurrentWeatherProps {
}

const CurrentWeather: React.FC<CurrentWeatherProps> = () => {
  const dispatch = useAppDispatch();

  const city = useAppSelector(state => state.weather.city);
  const currentWeather = useAppSelector(state => state.weather.currentWeather);
  const { lat, lon } = city ?? {};

  useEffect(() => {
    if (!lat || !lon) return;
    (async () => {
      const currentWeather = await OpenWeather.getCurrentWeather({ lat, lon });
      const cityTime = new Date((currentWeather.dt + currentWeather.timezone) * 1000).getUTCHours() + 1;
      dispatch(setCurrentWeather(currentWeather));
      dispatch(setBackgroundColor(cityTime >= 6 && cityTime < 18 ? 'day' : 'night'))
    })()
  }, [lat, lon, dispatch]);

  if (!currentWeather || !city) return null;
  const cityTime = new Date((currentWeather.dt + currentWeather.timezone) * 1000).getUTCHours();
  const iconNum = currentWeather.weather[0].icon.substring(0, 2);
  const iconSrc = weatherIcon[`${iconNum}${cityTime >= 6 && cityTime < 18 ? 'd' : 'n'}` as WeatherCondition['icon']];

  return (
    <section aria-label='city and main information' className='p-4 pt-6 flex flex-col items-center'>
      <p aria-label='city' className='text-2xl font-medium'>{city.name}, {city.country}</p>
      <p aria-label='main temperature' className='text-4xl font-bold'>{currentWeather.main.temp.toFixed()}°C</p>
      <img src={iconSrc} alt='weather icon' width={80} height={80} />
      <p aria-label='highest and lowest temperature' className='flex justify-center gap-4 text-lg font-medium'>
        <span>Max: {currentWeather.main.temp_max.toFixed()}°C</span>
        <span>Min: {currentWeather.main.temp_min.toFixed()}°C</span>
        <span>Hum: {currentWeather.main.humidity.toFixed()}%</span>
      </p>
    </section >
  )
}

export default CurrentWeather