import React, { useEffect } from 'react'
import { getIconSrc, isDayOrNight } from '../utils';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getCurrentWeather } from '../store/slices/weather.slice';

interface CurrentWeatherProps { }

const CurrentWeather: React.FC<CurrentWeatherProps> = () => {
  const dispatch = useAppDispatch();

  const city = useAppSelector(state => state.weather.city);
  const currentWeather = useAppSelector(state => state.weather.currentWeather);
  const { lat, lon } = city ?? {};

  useEffect(() => {
    if (!lat || !lon) return;
    dispatch(getCurrentWeather({ lat, lon }));
  }, [lat, lon, dispatch]);

  if (!currentWeather || !city) return null;

  const dayOrNight = isDayOrNight(currentWeather.sys.sunrise, currentWeather.sys.sunset, currentWeather.dt * 1000, currentWeather.timezone)
  const iconSrc = getIconSrc(currentWeather.weather[0].icon, dayOrNight);

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