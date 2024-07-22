import { useEffect, useState } from 'react';
import OpenWeather from './api/openWeather.api';
import { setCity, setIsLoading } from './store/slices/weather.slice';
import Header from './components/Header';
import WeatherDashboard from './components/WeatherDashboard';
import CityCardList from './components/CityCardList';
import Footer from './components/Footer';
import Spinner from './components/Sipnner';
import { useAppDispatch } from './hooks';

function App() {
  const dispatch = useAppDispatch();
  const [prompt, setPrompt] = useState('');

  // Get user's location permission and set the weather information
  useEffect(() => {
    const setUserLocalWeather = async (position: GeolocationPosition) => {
      dispatch(setIsLoading(true));
      const { latitude, longitude } = position.coords;
      const cities = await OpenWeather.getCityInfoByCoords({ lat: latitude, lon: longitude });
      dispatch(setCity(cities[0]));
      dispatch(setIsLoading(false));
    };

    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          navigator.geolocation.getCurrentPosition(setUserLocalWeather);
        } else if (result.state === 'prompt' || result.state === 'denied') {
          console.log('set');

          setPrompt('Please allow location access to get the weather information.');
        }
      });
    } else {
      navigator.geolocation.getCurrentPosition(setUserLocalWeather);
    }
  }, [dispatch]);


  return (
    <div className='mx-auto max-w-screen-md'>
      <Header />
      {prompt && <p className='fixed z-10 text-center top-1/2 -translate-y-1/2'>{prompt}</p>}
      <main className='text-shadow-sm px-2 pb-20 mx-auto max-w-screen-md min-h-screen relative select-none overflow-y-scroll'>
        <WeatherDashboard />
        <CityCardList />
      </main>
      <Footer />
      <Spinner />
    </div>
  )
}

export default App
