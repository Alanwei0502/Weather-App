import React from 'react';
import { useAppSelector } from '../hooks';

interface SpinnerProps { }

const Spinner: React.FC<SpinnerProps> = () => {
  const isLoading = useAppSelector(state => state.weather.isLoading);
  return (
    <div
      className={`inline-block h-12 w-12 animate-spin rounded-full border-8 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-slate-200 fixed top-0 left-0 right-0 bottom-0 m-auto ${isLoading ? '' : 'hidden'}`}
      role="status">
      <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      ></span>
    </div>
  );
};

export default Spinner;