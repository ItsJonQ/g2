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
	opacity: 0.6;
`;

export const highlighterText = css`
	mark {
		background: ${get('yellowRgba70')};
		border-radius: 2px;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05) inset,
			0 -1px 0 rgba(0, 0, 0, 0.1) inset;
	}
`;
