import { css, system } from '@wp-g2/system';

const { get } = system;

export const Surface = css`
	background-color: ${get('surfaceBackgroundColor')};
	color: ${get('colorText')};
	position: relative;
`;
