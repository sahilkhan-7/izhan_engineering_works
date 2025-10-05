"use client";
import { ButtonHTMLAttributes } from "react";

export const Button = ({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`px-4 py-2 rounded font-medium text-sm transition duration-200 border ${
      props.disabled
        ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
        : 'bg-orange-600 text-white hover:bg-orange-700'
    } ${className}`}
    {...props}
  />
);
