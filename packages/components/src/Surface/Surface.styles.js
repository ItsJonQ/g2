import { css, styled, ui } from '@wp-g2/styles';

export const SurfaceView = styled.div`
	background-color: ${ui.get('surfaceColor')};
	color: ${ui.get('colorText')};
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
