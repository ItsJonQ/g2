import { css } from '../css';

const fontSizes = [3, 2.25, 1.5, 1.25, 1, 0.875, 0.75];

const typeScale = fontSizes.reduce((styles, value, i) => {
	const index = i + 1;
	const name = `f${index}`;
	return {
		...styles,
		[name]: css`
			font-size: ${value}em;
		`,
	};
}, {});

export default typeScale;
