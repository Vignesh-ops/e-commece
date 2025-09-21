
import React,{forwardRef} from 'react'
import { Link } from 'react-router-dom';

const Button = forwardRef(({ children, onClick, type = "button", className = "",...rest },ref) => (
    <button
      type={type}
      onClick={onClick}
      ref={ref}
      {...rest}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm ${className}`}
    >
      {children}
    </button>
  ));
  
  export default Button;
  