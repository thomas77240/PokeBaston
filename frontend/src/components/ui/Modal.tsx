import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: ReactNode;
	className?: string;
}

const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return createPortal(
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
			onClick={onClose}
		>
			<motion.div
				layout
				initial={{ opacity: 0, scale: 0.95, y: 20 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				exit={{ opacity: 0, scale: 0.95, y: 20 }}
				transition={{
					layout: { type: 'spring', bounce: 0.2, duration: 0.4 },
					opacity: { duration: 0.2 },
				}}
				className={`bg-background-50 rounded-xl shadow-2xl w-full overflow-hidden flex flex-col ${className}`}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</motion.div>
		</div>,
		document.body, // Attacher la modale au body
	);
};

export default Modal;
