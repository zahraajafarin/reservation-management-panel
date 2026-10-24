import { ButtonProps } from "@/types/common/button";

const COLORS = {
  indigo: "bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-500",
  red: "bg-red-600 hover:bg-red-700 focus-visible:ring-red-500",
  emerald: "bg-emerald-600 hover:bg-emerald-700 focus-visible:ring-emerald-500",
};

function Button({
  children,
  onClick,
  type = "button",
  color = "indigo",
  disabled = false,
  className = ''
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${COLORS[color]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;