import React from 'react'
import { weatherIcon } from '../utils';
import { useAppSelector } from '../hooks';

interface ForecastItemProps {
  forecast: GetForecastResponse['list'][0];
}

const ForecastItem: React.FC<ForecastItemProps> = (props) => {
  const { forecast } = props;

  const currentWeather = useAppSelector(state => state.weather.currentWeather);

  if (!currentWeather) return null;

  const iconNum = forecast.weather[0].icon.substring(0, 2);
  const hour = new Date((forecast.dt + currentWeather.timezone) * 1000).getUTCHours() + 1;
  const iconSrc = weatherIcon[`${iconNum}${[21, 24, 3].includes(hour) ? 'n' : 'd'}` as WeatherCondition['icon']];

  return (
    <div className='text-center'>
      <p className='w-16'>{`${hour}`.padStart(2, '0')}</p>
      <img src={iconSrc} alt='weather icon' width={50} height={50} className='w-full' />
      <p>{forecast.main.temp.toFixed()}°C</p>
    </div>
  )
}

export default ForecastItem