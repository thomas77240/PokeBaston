import { ChevronLeft } from 'lucide-react';

interface ConfigHeaderProps {
	className?: string;
	title: string;
	backButtonAction: () => unknown;
}

const ConfigHeader = ({ className, title, backButtonAction }: ConfigHeaderProps) => {
	return (
		<header
			className={`bg-background-100 h-20 border-b items-center border-background-600 py-4 px-8 grid grid-cols-3 ${className}`}
		>
			<button
				onClick={backButtonAction}
				className="group flex gap-2 h-full w-fit items-center text-muted hover:text-foreground font-medium cursor-pointer"
			>
				<ChevronLeft className="bg-background-500 group-hover:bg-background-600 p-1 h-8 w-8 rounded-full" />
				Retour
			</button>
			<h2 className="text-center font-title text-3xl">{title}</h2>
		</header>
	);
};

export default ConfigHeader;
