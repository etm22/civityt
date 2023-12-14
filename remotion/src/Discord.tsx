import {
	AbsoluteFill,
	Audio,
	Img,
	Series,
	interpolate,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {linearTiming, TransitionSeries} from '@remotion/transitions';
import {flip} from '@remotion/transitions/flip';

export const Discord = (props: any) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const prompt = 'a cat dancing in port louis';
	const imageURL =
		'https://media.discordapp.net/attachments/1182916549598785606/1184166896656978032/a_cat_dancing_at_port_louis.png';

	const IMAGINE_TEXT_DIF = 1 * fps;
	const PROMPT_TEXT_DIF = 2 * fps;
	const IMAGE_DIF = 2.5 * fps;

	const springAnimationTextBox = spring({
		fps,
		frame,
		config: {
			mass: 1,
			damping: 30,
			stiffness: 200,
		},
	});
	const springAnimationImage = spring({
		fps,
		frame: frame - IMAGINE_TEXT_DIF - PROMPT_TEXT_DIF,
		config: {
			mass: 1,
			damping: 30,
			stiffness: 200,
		},
	});

	const interpolatedTextboxLeft = interpolate(
		springAnimationTextBox,
		[0, 1],
		[-100, 10]
	);
	const interpolatedTextboxTop = interpolate(
		springAnimationImage,
		[0, 1],
		[35, 18]
	);
	const interpolatedImageScale = interpolate(
		springAnimationImage,
		[0, 1],
		[0.2, 1]
	);

	const TypingText = ({text, textDurationInFrames, offsetFrames}: any) => {
		const textLength = interpolate(
			frame,
			[offsetFrames, offsetFrames + textDurationInFrames],
			[0, text.length],
			{extrapolateRight: 'clamp'}
		);

		return text.substring(0, Math.round(textLength));
	};

	const textboxStyles: React.CSSProperties = {
		backgroundColor: '#383A40',
		height: '150px',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: '50px 50px',
		left: interpolatedTextboxLeft + '%',
		borderRadius: '25px',
		width: '85%',
		transform: 'rotateY(5deg)',
	};
	const promptStyles: React.CSSProperties = {
		fontSize: '50px',
		color: '#DBDEE1',
		backgroundColor: '#232428',
		padding: '2% 2%',
		borderRadius: '15px',
	};
	const imagineStyles: React.CSSProperties = {
		fontSize: '50px',
		color: '#CBCDD1',
		marginRight: '15px',
		fontWeight: 'bolder',
	};

	return (
		<AbsoluteFill style={{backgroundColor: 'black'}}>
			<TransitionSeries>
				<TransitionSeries.Sequence
					durationInFrames={IMAGINE_TEXT_DIF + PROMPT_TEXT_DIF + IMAGE_DIF}
				>
					<AbsoluteFill
						style={{
							backgroundColor: '#313338',
							display: 'flex',
						}}
					>
						<Series>
							<Series.Sequence durationInFrames={IMAGINE_TEXT_DIF}>
								<AbsoluteFill style={{perspective: '1000px'}}>
									<AbsoluteFill style={{...textboxStyles, top: '35%'}}>
										<Audio src={staticFile('typing.mp3')} />
										<p style={imagineStyles}>
											<TypingText
												text={'/imagine'}
												textDurationInFrames={IMAGINE_TEXT_DIF}
												offsetFrames={0}
											/>
										</p>
									</AbsoluteFill>
								</AbsoluteFill>
							</Series.Sequence>

							<Series.Sequence durationInFrames={PROMPT_TEXT_DIF}>
								<AbsoluteFill style={{perspective: '1000px'}}>
									<AbsoluteFill style={{...textboxStyles, top: '35%'}}>
										<Audio src={staticFile('typing.mp3')} />

										<p style={imagineStyles}>/imagine</p>
										<p style={promptStyles}>
											<TypingText
												text={prompt}
												textDurationInFrames={PROMPT_TEXT_DIF}
												offsetFrames={IMAGINE_TEXT_DIF}
											/>
										</p>
									</AbsoluteFill>
								</AbsoluteFill>
							</Series.Sequence>

							<Series.Sequence durationInFrames={IMAGE_DIF}>
								<AbsoluteFill style={{perspective: '1000px'}}>
									<AbsoluteFill
										style={{
											...textboxStyles,
											top: `${interpolatedTextboxTop}%`,
										}}
									>
										<Audio src={staticFile('message.mp3')} />

										<p style={imagineStyles}>/imagine</p>
										<p style={promptStyles}>{prompt}</p>
									</AbsoluteFill>
									<AbsoluteFill
										style={{
											top: '30%',
											left: '10%',
											transform: `scale(${interpolatedImageScale}) rotateY(5deg)`,
											width: '85%',
											borderRadius: '25px',
										}}
									>
										<Img
											style={{
												borderRadius: '25px',
											}}
											src={imageURL}
										></Img>
									</AbsoluteFill>
								</AbsoluteFill>
							</Series.Sequence>
						</Series>
					</AbsoluteFill>
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					presentation={flip()}
					timing={linearTiming({durationInFrames: 0.5 * fps})}
				/>
				<TransitionSeries.Sequence durationInFrames={3 * fps}>
					<AbsoluteFill
						style={{
							top: '25%',
							background: 'black',
							display: 'flex',
							alignItems: 'center',
							height: '100%',
						}}
					>
						<Audio src={staticFile('scary.mp3')} />

						<Img width={500} height={500} src={staticFile('logo.png')} />
						<h1
							style={{
								fontSize: '70px',
								backgroundColor: 'black',
								color: '#FEFD87',
							}}
						>
							Create images from text
						</h1>
						<h1
							style={{
								fontSize: '70px',
								backgroundColor: 'black',
								color: '#FEFD87',
							}}
						>
							Join discord server
						</h1>
					</AbsoluteFill>
				</TransitionSeries.Sequence>
			</TransitionSeries>
		</AbsoluteFill>
	);
};

{
}
