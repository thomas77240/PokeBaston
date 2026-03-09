import { type ReactNode } from 'react';

interface ButtonProps {
	children: ReactNode;
	className?: string;
	disabled?: boolean;
	onClick?: () => void;
}

const Button = ({ children, className = '', disabled = false, onClick }: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`${disabled || 'cursor-pointer hover:opacity-75'} bg-background-light p-2 rounded-full px-4 py-2  ${className}`}
		>
			{children}
		</button>
	);
};

export default Button;
