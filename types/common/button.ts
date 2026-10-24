export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  color?: "indigo" | "red" | "emerald";
  disabled?: boolean;
  className?: string;
};