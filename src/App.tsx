import './App.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import OpenWeather from './api/openWeather.api';
import { setCity } from './store/slices/weather.slice';
import Header from './components/Header';
import WeatherDashboard from './components/WeatherDashboard';
import CityCardList from './components/CityCardList';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();

  // Get user's location permission and set the weather information
  useEffect(() => {
    const setUserLocalWeather = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      const cities = await OpenWeather.getCityInfoByCoords({ lat: latitude, lon: longitude });
      dispatch(setCity(cities[0]))
    };

    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          navigator.geolocation.getCurrentPosition(setUserLocalWeather);
        } else if (result.state === 'prompt' || result.state === 'denied') {
          alert('Please allow location access to get the weather information.');
        }
      });
    } else {
      navigator.geolocation.getCurrentPosition(setUserLocalWeather);
    }
  }, [dispatch]);


  return (
    <div className='mx-auto max-w-screen-md'>
      <Header />
      <main className='text-shadow-sm px-2 pb-20 mx-auto max-w-screen-md min-h-screen relative select-none overflow-y-scroll'>
        <WeatherDashboard />
        <CityCardList />
      </main>
      <Footer />
    </div>
  )
}

export default App
