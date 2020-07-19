import { css, system } from '@wp-g2/system';
const { get } = system;

export const Text = css`
	color: ${get('colorText')};
`;

export const Block = css`
	display: block;
`;

export const Positive = css`
	color: ${get('colorPositive')};
`;

export const Destructive = css`
	color: ${get('colorDestructive')};
`;

export const Muted = css`
	opacity: 0.5;
`;
