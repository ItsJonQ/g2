import { css, styled, toPx } from '@g2/css';
import { is } from '@g2/utils';

const baseStyles = ({ borderRadius, offset, theme, value }) => {
	const { config } = theme;
	const boxShadow = getBoxShadow(value);
	const transition = ` box-shadow ${config.elevationTransitionDuration}
    ${config.elevationTransitionTimingFunction}`;

	return css`
		background: transparent;
		box-shadow: ${boxShadow};
		border-radius: ${borderRadius};
		bottom: ${toPx(offset)};
		display: block;
		left: ${toPx(offset)};
		margin: 0 !important;
		pointer-events: none;
		position: absolute;
		right: ${toPx(offset)};
		top: ${toPx(offset)};
		transition: ${transition};
		will-change: box-shadow;
	`;
};

const interactiveStyles = ({ active, hover, focus, isInteractive, value }) => {
	let hoverValue = is.defined(hover) ? hover : value * 2;
	let activeValue = is.defined(active) ? hover : value / 2;

	if (!isInteractive) {
		hoverValue = is.defined(hover) ? hover : undefined;
		activeValue = is.defined(active) ? active : undefined;
	}

	let hoverStyles;
	let focusStyles;
	let activeStyles;

	if (is.defined(hoverValue)) {
		hoverStyles = css`
			*:hover > & {
				box-shadow: ${getBoxShadow(hoverValue)};
			}
		`;
	}

	if (is.defined(activeValue)) {
		activeStyles = css`
			*:active > & {
				box-shadow: ${getBoxShadow(activeValue)};
			}
		`;
	}

	if (is.defined(focus)) {
		focusStyles = css`
			*:focus > & {
				box-shadow: ${getBoxShadow(focus)};
			}
		`;
	}

	const styles = [activeStyles, focusStyles, hoverStyles];

	return css(...styles);
};

export const ElevationView = styled.BaseView`
	${baseStyles};
	${interactiveStyles};
`;

function getBoxShadow(value) {
	const boxShadowColor = `rgba(0 ,0, 0, ${value / 20})`;
	const boxShadow = `0 ${toPx(value)} ${toPx(value * 2)} 0
	${boxShadowColor}`;

	return boxShadow;
}
