import {
	AbsoluteFill,
	Audio,
	Img,
	Series,
	Video,
	continueRender,
	delayRender,
	staticFile,
	useVideoConfig,
} from 'remotion';
import introAlignment from '../../data/remotion/intro_alignment.json';
import imagesData from '../../outputs/remotion.json';

export const MyComposition = () => {
	const waitForFont = delayRender();
	const font = new FontFace(
		`soehne`,
		`url('${staticFile('ObelixPro.ttf')}') format('ttf')`
	);
	font
		.load()
		.then(() => {
			document.fonts.add(font);
			continueRender(waitForFont);
		})
		.catch((err) => console.log('Error loading font', err));
	const videoConfig = useVideoConfig();

	return (
		<AbsoluteFill>
			<Audio src="https://huggingface.co/upmr/temp/resolve/main/intro_8.wav"></Audio>
			<Video
				height={videoConfig.height}
				width={videoConfig.width}
				muted={true}
				src="https://huggingface.co/upmr/temp/resolve/main/m3.mp4"
			></Video>

			<AbsoluteFill
				style={{
					backgroundColor: 'black',
					opacity: 0.5,
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
									color: '#1EF709',
									fontFamily: 'ObelixPro',
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

				{imagesData.urls.map((img, idx: number) => {
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
									color: '#1EF709',
									fontFamily: 'ObelixPro',
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
					opacity: '0.5',
					color: 'white',
				}}
			>
				<h1>@ai_temple</h1>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
