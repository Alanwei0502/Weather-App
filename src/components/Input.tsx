import React from 'react'

const inputIcon = {
  search: <svg className="absolute left-3 top-1/2 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50" fill='gray'><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" /></svg>
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.RefObject<HTMLInputElement>;
  icon?: keyof typeof inputIcon;
}

const Input: React.FC<InputProps> = (props) => {
  const { className = '', icon, ...restProps } = props;
  return (
    <div className="relative w-full">
      <input
        type="text"
        className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-gray-100 rounded-lg shadow-sm appearance-none focus:outline-none focus:border-transparent transition duration-200 ease-in-out drop-shadow-lg ${className}`}
        {...restProps}
      />
      {icon && inputIcon[icon]}
    </div>
  )
}

export default Input