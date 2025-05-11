import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  containerClassName?: string;
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      leftElement,
      rightElement,
      containerClassName = "",
      className = "",
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    const hasError = !!error;

    return (
      <div className={`flex flex-col w-full space-y-2 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <div
          className={`relative flex items-center w-full ${
            hasError ? "ring-2 ring-red-500" : ""
          }`}
        >
          {leftElement && (
            <div className="absolute left-3 flex items-center pointer-events-none text-gray-500">
              {leftElement}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
            ${leftElement ? "pl-10" : ""}
            ${rightElement ? "pr-10" : ""}
            ${
              hasError
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : ""
            }
            ${className}`}
            disabled={disabled}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 flex items-center">
              {rightElement}
            </div>
          )}
        </div>
        {error && <div className="text-sm text-red-500">{error}</div>}
      </div>
    );
  }
);

Input.displayName = "Input";
