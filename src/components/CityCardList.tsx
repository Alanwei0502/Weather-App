import React, { useEffect } from 'react'
import { DndContext, DragEndEvent, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import CityCard from './CityCard';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setFavoriteCities } from '../store/slices/weather.slice';

interface CityCardListProps {
}

const CityCardList: React.FC<CityCardListProps> = () => {
  const dispatch = useAppDispatch();

  const isMenuOpen = useAppSelector(state => state.weather.isMenuOpen);
  const favoriteCities = useAppSelector(state => state.weather.favoriteCities);

  useEffect(() => {
    if (isMenuOpen) {
      dispatch(setFavoriteCities('update'));
    }
  }, [dispatch, isMenuOpen])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const oldIndex = favoriteCities.findIndex((c) => c.id === active.id);
      const newIndex = favoriteCities.findIndex((c) => c.id === over.id);
      const newOrders = arrayMove(favoriteCities, oldIndex, newIndex);
      localStorage.setItem('my_cities', JSON.stringify(newOrders));
      dispatch(setFavoriteCities('update'));
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <>
      <div aria-label="menu-bg" className={`absolute inset-0 bg-black ${isMenuOpen ? 'block' : 'hidden'}`} />
      <section className={`relative duration-100 ease-in-out ${isMenuOpen ? 'block' : 'hidden'}`}>
        {favoriteCities.length > 0
          ? (
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
              <SortableContext items={favoriteCities}>
                {favoriteCities.map(city => <CityCard city={city} key={city.id} />)}
              </SortableContext>
            </DndContext>
          )
          : (
            <p className='text-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Please search a city and add to the list.</p>
          )
        }
      </section>
    </>

  )
}

export default CityCardList