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
			className={`${disabled ? 'text-background-800 bg-background-500' : 'cursor-pointer bg-neutral-950 hover:bg-neutral-950/95 text-white'} block p-2 rounded-xl px-4 py-2 translate-0 ${className}`}
		>
			{children}
		</button>
	);
};

export default Button;
