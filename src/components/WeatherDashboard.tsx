import { useAppSelector } from '../hooks';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';

const WeatherDashboard = () => {
  const backgroundColor = useAppSelector(state => state.weather.backgroundColor);
  const isMenuOpen = useAppSelector(state => state.weather.isMenuOpen);
  return (
    <>
      <div aria-label="day-bg" className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-gradient-to-t from-sky-800 via-sky-650 to-sky-500 ${backgroundColor === 'day' ? 'opacity-100' : 'opacity-0'}`}
      />
      <div aria-label="night-bg" className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-gradient-to-t from-slate-950 via-indigo-950 to-blue-900 ${backgroundColor === 'night' ? 'opacity-100' : 'opacity-0'}`}
      />
      <section className={`relative duration-100 ease-in-out ${!isMenuOpen ? 'block' : 'hidden'}`} >
        <CurrentWeather />
        <Forecast />
      </section>
    </>
  )
}

export default WeatherDashboard