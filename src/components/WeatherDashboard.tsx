import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import { setCity, setIsLoading } from '../store/slices/weather.slice';
import OpenWeather from '../api/openWeather.api';

const WeatherDashboard = () => {
  const dispatch = useAppDispatch();
  const [isShowPrompt, setIsShowPrompt] = useState(false);

  const city = useAppSelector(state => state.weather.city);
  const backgroundColor = useAppSelector(state => state.weather.backgroundColor);
  const isMenuOpen = useAppSelector(state => state.weather.isMenuOpen);

  // Get user's geolocation and show the local weather information
  useEffect(() => {
    dispatch(setIsLoading(true));

    navigator.geolocation.getCurrentPosition(
      async (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        const cities = await OpenWeather.getCityInfoByCoords({ lat: latitude, lon: longitude });
        dispatch(setCity(cities[0]));
        dispatch(setIsLoading(false));
      },
      () => {
        setIsShowPrompt(true);
        dispatch(setIsLoading(false));
      }
    );
  }, [dispatch]);

  return (
    <>
      <div aria-label="day-bg" className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-gradient-to-t from-sky-800 via-sky-650 to-sky-500 ${backgroundColor === 'day' ? 'opacity-100' : 'opacity-0'}`}
      />
      <div aria-label="night-bg" className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-gradient-to-t from-slate-950 via-indigo-950 to-blue-900 ${backgroundColor === 'night' ? 'opacity-100' : 'opacity-0'}`}
      />
      <p className={`absolute z-10 text-center w-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 ${!city && !isMenuOpen && isShowPrompt ? '' : 'hidden'}`}>Please allow location access to get the local weather information.</p>

      <section className={`relative duration-100 ease-in-out ${!isMenuOpen ? '' : 'hidden'}`} >
        <CurrentWeather />
        <Forecast />
      </section>
    </>
  )
}

export default WeatherDashboard