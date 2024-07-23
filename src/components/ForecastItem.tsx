import React from 'react'
import { getIconSrc, getLocalTime, isDayOrNight } from '../utils';

interface ForecastItemProps {
  forecast: GetForecastResponse['list'][0];
  city: GetForecastResponse['city'];
}

const ForecastItem: React.FC<ForecastItemProps> = (props) => {
  const { forecast, city } = props;

  const { sunrise, sunset } = city;
  const hour = getLocalTime(forecast.dt_txt, city.timezone).getHours();
  const dayOrNight = isDayOrNight(sunrise, sunset, forecast.dt_txt, city.timezone);
  const iconSrc = getIconSrc(forecast.weather[0].icon, dayOrNight);

  return (
    <div className='text-center'>
      <p className='w-16'>{`${hour}`.padStart(2, '0')}</p>
      <img src={iconSrc} alt='weather icon' width={50} height={50} className='w-full' />
      <p>{forecast.main.temp.toFixed()}°C</p>
    </div>
  )
}

export default ForecastItem