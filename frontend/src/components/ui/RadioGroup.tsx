import { type ChangeEvent } from 'react';

export interface RadioOption {
	label: string;
	value: string;
}

interface RadioGroupProps {
	name: string;
	options: RadioOption[];
	selectedValue: string;
	onChange: (value: string) => void;
	className?: string;
}

const RadioGroup = ({ name, options, selectedValue, onChange, className = '' }: RadioGroupProps) => {
	return (
		<div className={`flex flex-wrap gap-4 ${className}`}>
			{options.map((option) => (
				<label key={option.value} className="flex items-center gap-2 cursor-pointer group">
					<input
						type="radio"
						name={name}
						value={option.value}
						checked={selectedValue === option.value}
						onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
					/>
					<span className="text-muted group-hover:text-inherit transition-colors">
						{option.label}
					</span>
				</label>
			))}
		</div>
	);
};

export default RadioGroup;
