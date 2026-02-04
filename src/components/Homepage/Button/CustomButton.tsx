import { ButtonHTMLAttributes, FC } from 'react';
import { cn } from '@/utils/cn/cn';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const CustomButton: FC<CustomButtonProps> = ({
  className,
  children = 'Học ngay',
  ...props
}) => {
  return (
    <button
      className={cn(
        "relative w-full p-2 bg-yellow-300 shadow-lg rounded-lg border border-white",
        "hover:bg-yellow-400 transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "flex items-center justify-center", // Added flex and centering
        className
      )}
      {...props}
    >
      <span className="text-sm sm:text-base font-bold text-cyan-900 font-sans">
        {children}
      </span>
    </button>
  );
};

export default CustomButton;