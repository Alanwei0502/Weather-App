import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Input from './Input';
import OpenWeather from '../api/openWeather.api';
import { setBackgroundColor, setCity, toggleMenu } from '../store/slices/weather.slice';
import { useAppSelector } from '../hooks';


const Header = () => {
  const dispatch = useDispatch();

  const [input, setInput] = useState('');

  const isMenuOpen = useAppSelector(state => state.weather.isMenuOpen);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  }

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        const cities = await OpenWeather.getCityInfo({ q: e.currentTarget.value });
        const city = cities[0];
        const { lat, lon } = city;
        const currentWeather = await OpenWeather.getCurrentWeather({ lat, lon });
        const cityTime = new Date((currentWeather.dt + currentWeather.timezone) * 1000).getUTCHours();
        dispatch(setCity(city))
        dispatch(setBackgroundColor(cityTime >= 6 && cityTime < 18 ? 'day' : 'night'));
        dispatch(toggleMenu({}));
        setInput('');
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <header className={`backdrop-blur-3xl px-2 py-4 sticky top-0 z-10 bg-black ${isMenuOpen ? 'block' : 'hidden'}`}>
      <Input value={input} icon='search' onChange={handleChange} onKeyDown={handleSearch} placeholder="Search for a city" />
    </header>
  )
}

export default Header