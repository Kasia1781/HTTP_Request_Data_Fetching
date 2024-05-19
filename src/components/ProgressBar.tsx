import { useState, useEffect } from 'react';

type ProgressProps = {
	timer: number;
};

export default function ProgressBar({ timer }: ProgressProps) {
	const [remainingTime, setRemainingTime] = useState(timer);

	useEffect(() => {
		const interval = setInterval(() => {
			setRemainingTime((prevTime) => {
				if (prevTime <= 10) {
					clearInterval(interval);
					return 0;
				}
				return prevTime - 10;
			});
		}, 10);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return <progress value={remainingTime} max={timer} />;
}
