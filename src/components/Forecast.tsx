import { useEffect } from 'react'
import ForecastItem from './ForecastItem';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getForecast } from '../store/slices/weather.slice';

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface ForecastProps {
}

const Forecast: React.FC<ForecastProps> = () => {
  const dispatch = useAppDispatch();

  const city = useAppSelector(state => state.weather.city);
  const currentWeather = useAppSelector(state => state.weather.currentWeather);
  const forecast = useAppSelector(state => state.weather.forecast);

  const { lat, lon } = city ?? {};

  useEffect(() => {
    if (!lat || !lon) return;
    dispatch(getForecast({ lat, lon }));
  }, [dispatch, lat, lon])

  if (!forecast || !currentWeather) return null;

  const groupByDayList = forecast?.list?.reduce((acc, cur) => {
    const day = new Date((cur.dt + currentWeather.timezone) * 1000).getUTCDay();

    if (!acc[day]) {
      acc[day] = [cur];
    } else {
      acc[day].push(cur);
    }
    return acc;
  }, {} as { [key: PropertyKey]: GetForecastResponse['list'] }) ?? [];

  return (
    <section aria-label="5 day forecast" className='bg-blend-lighten p-3 rounded-2xl bg-gray-100 bg-opacity-10 backdrop-filter backdrop-blur-sm shadow-md'>
      <p aria-label='4 days forecast' className='font-medium pb-2 border-b-1'>Next 5-Day Forecast</p>
      {Object.entries(groupByDayList).map(([dayNum, list], idx) => (
        <div key={dayNum} className='flex items-center border-b-1 py-1 last:border-none'>
          <p className='text-lg font-medium min-w-16'>{idx === 0 ? 'Today' : daysOfWeek[Number(dayNum)]}</p>
          <div className='flex overflow-x-scroll'>
            {list.map((forecast) => (
              <ForecastItem key={forecast.dt} forecast={forecast} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default Forecast