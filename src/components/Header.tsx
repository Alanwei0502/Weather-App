import React, { useState } from 'react'
import Input from './Input';
import OpenWeather from '../api/openWeather.api';
import { getCurrentWeather, setCity, setIsLoading, toggleMenu } from '../store/slices/weather.slice';
import { useAppDispatch, useAppSelector } from '../hooks';


const Header = () => {
  const dispatch = useAppDispatch();

  const [input, setInput] = useState('');

  const isMenuOpen = useAppSelector(state => state.weather.isMenuOpen);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  }

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(setIsLoading(true));
      try {
        const cities = await OpenWeather.getCityInfo({ q: e.currentTarget.value });
        const city = cities[0];
        const { lat, lon } = city;
        dispatch(getCurrentWeather({ lat, lon }));
        dispatch(setCity(city))
        dispatch(toggleMenu({}));
        setInput('');
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setIsLoading(false));
      }
    }
  }

  return (
    <header className={`px-2 py-4 sticky top-0 z-10 bg-black ${isMenuOpen ? '' : 'hidden'}`}>
      <Input value={input} icon='search' onChange={handleChange} onKeyDown={handleSearch} placeholder="Search for a city" />
    </header>
  )
}

export default Header