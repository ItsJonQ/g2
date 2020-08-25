import { css, get, styled } from '@wp-g2/styles';

export const SurfaceView = styled.div`
	background-color: ${get('surfaceColor')};
	color: ${get('colorText')};
	position: relative;
`;

export const background = css`
	background-color: ${get('surfaceBackgroundColor')};
`;

export function getBorders({
	border,
	borderBottom,
	borderLeft,
	borderRight,
	borderTop,
}) {
	const borderStyle = `1px solid ${get('surfaceBorderColor')}`;

	return css({
		border: border && borderStyle,
		borderBottom: borderBottom && borderStyle,
		borderLeft: borderLeft && borderStyle,
		borderRight: borderRight && borderStyle,
		borderTop: borderTop && borderStyle,
	});
}

export const secondary = css`
	background: ${get('surfaceBackgroundTintColor')};
`;

export const tertiary = css`
	background: ${get('surfaceBackgroundColor')};
`;
