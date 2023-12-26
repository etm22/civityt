import {Composition} from 'remotion';
import {MyComposition} from './Composition';
import './style.css';
import {Discord} from './Discord';

export const RemotionRoot: React.FC = () => {
	const colors = ['yellow', '#1EF709', 'red', '#FF9209', '#39A7FF', '#F875AA'];
	const selectedColor = colors[Math.floor(Math.random() * colors.length)];
	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				durationInFrames={360}
				fps={24}
				width={1080}
				height={1920}
				defaultProps={{selectedColor}}
			/>
			<Composition
				id="MyComp2"
				component={Discord}
				durationInFrames={8.5 * 30}
				fps={30}
				width={1080}
				height={1920}
			/>
		</>
	);
};
