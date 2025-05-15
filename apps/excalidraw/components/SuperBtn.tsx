import { theme } from "@/constant";
import React from "react";

type buttonVariant = "red" | "black" | "white";

interface buttonProps {
  variant: buttonVariant;
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean
}

const SuperBtn = ({
  variant = "white",
  label,
  onClick,
  className,
  disabled,
}: buttonProps) => {
  const baseStyles = `font-medium capitalize py-2 px-4 rounded-md cursor-pointer hover:opacity-90`;

  const variantStyles = {
    red: { backgroundColor: theme.orangeColor, color: theme.black },
    black: {
      backgroundColor: theme.black,
      color: theme.white,
      border: `2px solid ${theme.gray}`,
    },
    white: { backgroundColor: theme.white, color: theme.black },
  };

  return (
    <button
      disabled={disabled}
      style={{ ...variantStyles[variant] }}
      onClick={onClick}
      className={`${baseStyles} ${className}`}
    >
      {label}
    </button>
  );
};

export default SuperBtn;
