import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks';
import Button from './Button';
import { setFavoriteCities, toggleMenu } from '../store/slices/weather.slice';

const Footer: React.FC = () => {
  const dispatch = useAppDispatch();

  const city = useAppSelector(state => state.weather.city);
  const isMenuOpen = useAppSelector(state => state.weather.isMenuOpen);
  const favoriteCities = useAppSelector(state => state.weather.favoriteCities);

  const isAddDisabled = favoriteCities.filter(i => i.name === city?.name).length > 0 || isMenuOpen;
  const isDeleteDisabled = favoriteCities.filter(i => i.name === city?.name).length === 0 || isMenuOpen;

  const handleClickAdd = () => {
    dispatch(setFavoriteCities('add'));
    dispatch(toggleMenu({}));
  }

  const handleClickDelete = () => {
    dispatch(setFavoriteCities('delete'));
    dispatch(toggleMenu({}));
  }

  return (
    <footer className="flex items-center justify-between max-w-screen-md w-full fixed bottom-0 p-4 backdrop-blur-lg">
      <Button icon='add' className='w-12' onClick={handleClickAdd} disabled={isAddDisabled} />
      {!isDeleteDisabled && <Button icon='delete' className='w-12' onClick={handleClickDelete} disabled={isDeleteDisabled} />}
      <Button icon='menu' className='w-12' onClick={() => dispatch(toggleMenu({}))} />
    </footer>
  )
}

export default Footer