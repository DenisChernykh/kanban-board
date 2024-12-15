import { ReactNode } from 'react';

function Button({
  children,
  onClick,
  className,
  variant = 'primary',
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}) {
  const variantClasses =
    variant === 'primary'
      ? ' border-indigo-500  bg-indigo-500  hover:bg-indigo-700  text-gray-50 hover:text-gray-200'
      : '';

  return (
    <button
      onClick={onClick}
      className={` border rounded-md ${variantClasses} transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
