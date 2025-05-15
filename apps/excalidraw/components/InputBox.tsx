import { theme } from "@/constant";
import React from "react";

interface InputProps {
  label: string;
  type?: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({
  label,
  type = "text",
  className,
  value,
  onChange,
}: InputProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-start gap-2">
      {label && <h1 className="capitalize">{label}</h1>}
      <input
        style={{ backgroundColor: theme.bg }}
        type={type}
        className={`p-3 rounded-xl w-full ${className}`}
        placeholder={`Enter ${label}`}
        required
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputBox;
