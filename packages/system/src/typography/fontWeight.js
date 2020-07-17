import { css } from '../css';

const fontWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900];

const fontWeight = fontWeights.reduce((styles, value, i) => {
	const index = i + 1;
	const name = `fw${index}`;
	return {
		...styles,
		[name]: css`
			font-weight: ${value};
		`,
	};
}, {});

export default fontWeight;
