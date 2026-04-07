import { useState, useEffect } from 'react';

interface TypewriterTextProps {
	text: string;
	speed?: number;
}

const TypewriterText = ({ text, speed = 30 }: TypewriterTextProps) => {
	const [displayedText, setDisplayedText] = useState('');

	useEffect(() => {
		setDisplayedText('');
		let currentIndex = 0;

		if (!text) return;

		const intervalId = setInterval(() => {
			setDisplayedText(text.slice(0, currentIndex + 1));
			currentIndex++;

			if (currentIndex >= text.length) {
				clearInterval(intervalId);
			}
		}, speed);

		return () => clearInterval(intervalId);
	}, [text, speed]);

	return <span>{displayedText}</span>;
};

export default TypewriterText;
