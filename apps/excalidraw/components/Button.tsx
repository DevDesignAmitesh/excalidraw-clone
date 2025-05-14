import React from "react";

interface ButtonProps {
  isSignin: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  loading?: boolean;
}

const Button = ({ isSignin, onClick, className, loading }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-3 bg-blue-600 text-white rounded-md w-full capitalize cursor-pointer 
				hover:opacity-90
				${className}`}
    >
      {loading ? "loading" : isSignin ? "signin" : "signup"}
    </button>
  );
};

export default Button;
