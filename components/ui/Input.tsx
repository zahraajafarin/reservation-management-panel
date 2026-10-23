import { InputProps } from "@/types/common/input";
import { useId } from "react";

function Input({
  id = '',
  label,
  error,
  hideLabel = false,
  type = "text",
  className = "",
  ...props
}: InputProps) {
  const innerId = id ? id : useId()
  const errorId = `${innerId}-error`;

  return (
    <div className="flex flex-col gap-1.5 items-start">
      <label
        htmlFor={innerId}
        className={
          hideLabel ? "sr-only" : "text-sm font-medium text-slate-700"
        }
      >
        {label}
      </label>

      <input
        id={innerId}
        type={type}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 ${
          error
            ? "border-red-500 focus-visible:ring-red-500/30"
            : "border-slate-300 hover:border-slate-400 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/30"
        } ${className}`}
        {...props}
      />

      {error && (
        <p id={errorId} className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;