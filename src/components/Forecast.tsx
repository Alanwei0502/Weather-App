import { useEffect } from 'react'
import ForecastItem from './ForecastItem';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getForecast } from '../store/slices/weather.slice';
import { getLocalTime } from '../utils';

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface ForecastProps {
}

const Forecast: React.FC<ForecastProps> = () => {
  const dispatch = useAppDispatch();

  const city = useAppSelector(state => state.weather.city);
  const forecast = useAppSelector(state => state.weather.forecast);

  const { lat, lon } = city ?? {};

  useEffect(() => {
    if (!lat || !lon) return;
    dispatch(getForecast({ lat, lon }));
  }, [dispatch, lat, lon])

  if (!forecast) return null

  const timezone = forecast.city.timezone ?? 0;

  const groupByDayList = Object.entries(
    forecast.list?.filter(item => new Date(item.dt_txt) >= new Date()).reduce((acc, cur) => {
      const localTime = getLocalTime(cur.dt_txt, timezone);
      const key = localTime.toLocaleDateString();

      if (!acc[key]) {
        acc[key] = [cur];
      } else {
        acc[key].push(cur);
      }
      return acc;
    }, {} as { [key: PropertyKey]: GetForecastResponse['list'] }) ?? {});

  console.log(groupByDayList);

  return (
    <section aria-label="5 day forecast" className='bg-blend-lighten p-3 rounded-2xl bg-gray-100 bg-opacity-10 backdrop-filter backdrop-blur-sm shadow-md'>
      <p aria-label='4 days forecast' className='font-medium pb-2 border-b-1'>Next 5-Day Forecast</p>
      {groupByDayList.map(([key, list], idx) => (
        <div key={key} className='flex items-center border-b-1 py-1 last:border-none'>
          <p className='text-lg font-medium min-w-16'>{idx === 0 ? 'Today' : daysOfWeek[new Date(key).getDay()]}</p>
          <div className='flex overflow-x-scroll'>
            {list.map((f) => (
              <ForecastItem key={f.dt} forecast={f} city={forecast.city} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default Forecast