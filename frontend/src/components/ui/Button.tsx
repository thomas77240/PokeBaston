import { type ReactNode } from 'react';

interface ButtonProps {
	children: ReactNode;
	className?: string;
	disabled?: boolean;
	onClick?: () => void;
	variant?: 'solid' | 'outline';
}

const Button = ({ children, className = '', disabled = false, onClick, variant = 'solid' }: ButtonProps) => {
	const baseStyles = 'block rounded-xl px-4 py-2 font-medium transition-all duration-200 translate-0';

	const activeStyles = {
		solid: 'cursor-pointer bg-neutral-950 hover:bg-neutral-950/90 text-white border border-transparent',
		outline: 'cursor-pointer bg-transparent border-2 border-neutral-950 text-neutral-950 hover:bg-neutral-100',
	};

	const disabledStyles = {
		solid: 'cursor-not-allowed text-background-800 bg-background-500 border border-transparent',
		outline: 'cursor-not-allowed text-background-800 border-2 border-background-500 bg-transparent',
	};

	const currentVariantStyle = disabled ? disabledStyles[variant] : activeStyles[variant];

	return (
		<button onClick={onClick} disabled={disabled} className={`${baseStyles} ${currentVariantStyle} ${className}`}>
			{children}
		</button>
	);
};

export default Button;
