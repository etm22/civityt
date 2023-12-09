import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import React from 'react';

export const VideoProgress: React.FC<{duration: number; color: string}> = ({
	duration,
	color,
}) => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();
	const videoWidth = videoConfig.width;
	const videoHeight = videoConfig.height;

	const totalDistance = 2 * videoHeight + 2 * videoWidth;

	const progressBar = {
		size: 15,
		color,
		value:
			interpolate(frame, [0, duration], [0, totalDistance]) % totalDistance,
	};

	const calculateProgressTop = () => {
		return progressBar.value < videoWidth ? progressBar.value : videoWidth;
	};

	const calculateProgressRight = () => {
		if (progressBar.value > videoWidth) {
			const maxProgress = videoWidth + videoHeight;
			return progressBar.value < maxProgress
				? progressBar.value - videoWidth
				: maxProgress;
		}

		return 0;
	};

	const calculateProgressBottom = () => {
		if (progressBar.value > videoWidth + videoHeight) {
			const maxProgress = 2 * videoWidth + videoHeight;
			return progressBar.value < maxProgress
				? progressBar.value - videoWidth - videoHeight
				: maxProgress;
		}

		return 0;
	};

	const calculateProgressLeft = () => {
		if (progressBar.value > 2 * videoWidth + videoHeight) {
			const maxProgress = 2 * videoWidth + 2 * videoHeight;
			return progressBar.value < maxProgress
				? progressBar.value - 2 * videoWidth - videoHeight
				: maxProgress;
		}

		return 0;
	};

	return (
		<div className="progress-bars">
			<div
				className="progress-top"
				style={{
					width: calculateProgressTop(),
					height: progressBar.size,
					backgroundColor: progressBar.color,
				}}
			/>

			<div
				className="progress-right"
				style={{
					position: 'absolute',
					top: 0,
					right: 0,
					width: progressBar.size,
					height: calculateProgressRight(),
					backgroundColor: progressBar.color,
				}}
			/>

			<div
				className="progress-bottom"
				style={{
					position: 'absolute',
					right: 0,
					bottom: 0,
					height: progressBar.size,
					width: calculateProgressBottom(),
					backgroundColor: progressBar.color,
				}}
			/>

			<div
				className="progress-left"
				style={{
					position: 'absolute',
					left: 0,
					bottom: 0,
					width: progressBar.size,
					height: calculateProgressLeft(),
					backgroundColor: progressBar.color,
				}}
			/>
		</div>
	);
};
