import { css, get } from '@wp-g2/styles';

export const Text = css`
	color: ${get('colorText')};
`;

export const block = css`
	display: block;
`;

export const positive = css`
	color: ${get('colorPositive')};
`;

export const destructive = css`
	color: ${get('colorDestructive')};
`;

export const muted = css`
	opacity: 0.5;
`;
