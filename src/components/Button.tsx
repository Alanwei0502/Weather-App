import React from 'react'
import AddIcon from '../assets/add.svg'
import MenuIcon from '../assets/menu.svg'
import DeleteIcon from '../assets/delete.svg'

const buttonIcon = {
  add: <img src={AddIcon} alt='add icon' width={100} height={100} />,
  menu: <img src={MenuIcon} alt='menu icon' width={100} height={100} />,
  delete: <img src={DeleteIcon} alt='delete icon' width={100} height={100} />,
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.RefObject<HTMLButtonElement>;
  icon?: keyof typeof buttonIcon;
}


const Button: React.FC<ButtonProps> = (props) => {
  const { children, icon = '', className, ...restProps } = props;

  const activeClasses = 'active:scale-95'
  const disabledClasses = props.disabled ? 'opacity-30 cursor-not-allowed active:scale-100' : '';

  return (
    <button className={`flex items-center gap-1 text-lg px-2 py-1 rounded-full transition duration-75 ease-in-out bg-gray-100 bg-opacity-10 backdrop-filter backdrop-blur-sm cursor-pointer shadow-md ${activeClasses} ${disabledClasses} ${className}`} {...restProps}>
      {icon && buttonIcon[icon]}
      {children}
    </button>
  )
}

export default Button