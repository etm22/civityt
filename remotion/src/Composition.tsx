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
				// volume={0.15}
			/>

			{/* <Audio src="https://huggingface.co/upmr/temp/resolve/main/intro_8.wav"></Audio> */}
			<Video
				height={videoConfig.height}
				width={videoConfig.width}
				muted={true}
				src={data.bg_video}
			></Video>

			<AbsoluteFill
				style={{
					backgroundColor: 'black',
					opacity: 0.1,
					width: '100%',
					height: '100%',
				}}
			></AbsoluteFill>
			<Series>
				{/* {introAlignment.sub_sentences[0].words_alignment.map((word, idx) => {
					return (
						<Series.Sequence
							key={`text-${idx}`}
							durationInFrames={Math.round(
								videoConfig.fps * (word.to - word.from)
							)}
						>
							<AbsoluteFill
								style={{
									top: '45%',
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
				})} */}
				{/* silence */}
				{/* <Series.Sequence durationInFrames={videoConfig.fps * 0.5}>
					<div></div>
				</Series.Sequence> */}

				{data.urls.map((img, idx: number) => {
					return (
						<Series.Sequence
							key={`image-${idx}`}
							durationInFrames={Math.round(videoConfig.fps * 1)}
						>
							<AbsoluteFill
								style={{
									top: '9%',
									textAlign: 'center',
									fontSize: '2.5em',
									// opacity: '0.75',
									color: selectedColor,
								}}
							>
								<h1>
									{idx + 1} / {data.urls.length}
								</h1>

								{/* <h1 style={{fontFamily: 'monospace'}}>www.aimages.xyz</h1> */}
							</AbsoluteFill>
							{/* <Audio
								src={`https://huggingface.co/upmr/temp/resolve/main/n_${
									idx + 1
								}.wav`}
							></Audio> */}

							<AbsoluteFill
								style={{
									padding: '15% 10%',
									top: '10%',
								}}
							>
								<Img
									src={img}
									style={{maxHeight: '50%', borderRadius: '5%'}}
									width="auto"
								></Img>
							</AbsoluteFill>
							<AbsoluteFill
								style={{
									top: '60%',
									textAlign: 'center',
									fontSize: '2.2em',
									color: selectedColor,
									fontFamily: 'monospace',
									// fontFamily: 'Obelix Pro Italic',
								}}
							>
								<h1>Create images with AI</h1>
							</AbsoluteFill>
							<AbsoluteFill
								style={{
									top: '65%',
									textAlign: 'center',
									fontSize: '2.2em',
									color: selectedColor,
									fontFamily: 'monospace',
									// fontFamily: 'Obelix Pro Italic',
								}}
							>
								<h1>www.aimages.xyz</h1>
							</AbsoluteFill>
						</Series.Sequence>
					);
				})}
			</Series>

			{/* <AbsoluteFill>
				<VideoProgress
					duration={videoConfig.durationInFrames}
					color={selectedColor}
				/>
			</AbsoluteFill> */}
		</AbsoluteFill>
	);
};
