import {
	AbsoluteFill,
	Audio,
	Img,
	Series,
	Video,
	useVideoConfig,
} from 'remotion';
import introAlignment from '../../data/remotion/intro_alignment.json';
import data from '../../outputs/remotion.json';
import {VideoProgress} from './VideoProgress';

export const MyComposition = (props: any) => {
	const videoConfig = useVideoConfig();
	const {selectedColor} = props;
	return (
		<AbsoluteFill>
			<Audio
				src="https://huggingface.co/upmr/temp/resolve/main/music.mp3"
				volume={0.15}
			/>

			<Audio src="https://huggingface.co/upmr/temp/resolve/main/intro_8.wav"></Audio>
			<Video
				height={videoConfig.height}
				width={videoConfig.width}
				muted={true}
				src={data.bg_video}
			></Video>

			<AbsoluteFill
				style={{
					backgroundColor: 'black',
					opacity: 0.4,
					width: '100%',
					height: '100%',
				}}
			></AbsoluteFill>
			<Series>
				{introAlignment.sub_sentences[0].words_alignment.map((word, idx) => {
					return (
						<Series.Sequence
							key={`text-${idx}`}
							durationInFrames={Math.round(
								videoConfig.fps * (word.to - word.from)
							)}
						>
							<AbsoluteFill
								style={{
									top: '40%',
									textAlign: 'center',
									fontSize: '3.5em',
									color: selectedColor,
									fontFamily: 'Obelix Pro Italic',
								}}
							>
								<h1>{word.value}</h1>
							</AbsoluteFill>
						</Series.Sequence>
					);
				})}
				{/* silence */}
				<Series.Sequence durationInFrames={videoConfig.fps * 0.5}>
					<div></div>
				</Series.Sequence>

				{data.urls.map((img, idx: number) => {
					return (
						<Series.Sequence
							key={`image-${idx}`}
							durationInFrames={Math.round(videoConfig.fps * 1.5)}
						>
							<Audio
								src={`https://huggingface.co/upmr/temp/resolve/main/n_${
									idx + 1
								}.wav`}
							></Audio>

							<AbsoluteFill
								style={{
									padding: '5%',
								}}
							>
								<Img src={img} style={{maxHeight: '50%'}} width="auto"></Img>
							</AbsoluteFill>
							<AbsoluteFill
								style={{
									top: '50%',
									textAlign: 'center',
									fontSize: '3.5em',
									color: selectedColor,
									fontFamily: 'Obelix Pro Italic',
								}}
							>
								<h1>{idx + 1}</h1>
							</AbsoluteFill>
						</Series.Sequence>
					);
				})}
			</Series>

			<AbsoluteFill
				style={{
					top: '75%',
					textAlign: 'center',
					fontSize: '2em',
					opacity: '0.4',
					color: 'white',
				}}
			>
				<h1>Subscribe @ai_temple</h1>
			</AbsoluteFill>
			<AbsoluteFill>
				<VideoProgress
					duration={videoConfig.durationInFrames}
					color={selectedColor}
				/>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
