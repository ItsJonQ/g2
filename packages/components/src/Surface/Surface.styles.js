import { css, ui } from '@wp-g2/styles';

export const Surface = css`
	background-color: ${ui.get('surfaceColor')};
	color: ${ui.color.text};
	position: relative;
`;

export const background = css`
	background-color: ${ui.get('surfaceBackgroundColor')};
`;

export function getBorders({
	border,
	borderBottom,
	borderLeft,
	borderRight,
	borderTop,
}) {
	const borderStyle = `1px solid ${ui.get('surfaceBorderColor')}`;

	return css({
		border: border && borderStyle,
		borderBottom: borderBottom && borderStyle,
		borderLeft: borderLeft && borderStyle,
		borderRight: borderRight && borderStyle,
		borderTop: borderTop && borderStyle,
	});
}

export const secondary = css`
	background: ${ui.get('surfaceBackgroundTintColor')};
`;

export const tertiary = css`
	background: ${ui.get('surfaceBackgroundColor')};
`;

export const dotted = css`
	background: linear-gradient(
				90deg,
				${ui.get('surfaceBackgroundColor')} 15px,
				transparent 1%
			)
			center,
		linear-gradient(
				${ui.get('surfaceBackgroundColor')} 15px,
				transparent 1%
			)
			center,
		${ui.get('surfaceBorderBoldColor')};
	background-size: 16px 16px;
`;

export const grid = css`
	background: ${ui.get('surfaceBackgroundColor')};
	background-image: linear-gradient(
			${ui.get('surfaceBorderSubtleColor')} 1px,
			transparent 1px
		),
		linear-gradient(
			90deg,
			${ui.get('surfaceBorderSubtleColor')} 1px,
			transparent 1px
		);
	background-size: 16px 16px;
`;
