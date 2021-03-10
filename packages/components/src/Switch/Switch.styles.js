import { css, ui } from '@wp-g2/styles';

function getSwitchWidth(height) {
	return `calc(${getControlHeight(height)} * 1.85);`;
}

export const Switch = css`
	cursor: pointer;
	display: flex;
	height: ${ui.get('controlHeight')};
	margin: 0;
	outline: none;
	padding: ${ui.get('switchPaddingOffset')} 0;
	position: relative;
	user-select: none;
	width: ${getSwitchWidth('controlHeight')};
`;

export const disabled = css`
	opacity: 0.6;
	pointer-events: none;
`;

export const large = css`
	height: ${ui.get('controlHeightLarge')};
	width: ${getSwitchWidth('controlHeightLarge')};
`;

export const small = css`
	height: ${ui.get('controlHeightSmall')};
	width: ${getSwitchWidth('controlHeightSmall')};
`;

export const inputHidden = css`
	opacity: 0;
	padding: 0;
	position: absolute;
	z-index: -1;
`;

export const Backdrop = css`
	${ui.borderRadius.circle()};

	background: ${ui.get('switchBackdropBackgroundColor')};
	border: 1px solid ${ui.get('switchBackdropBorderColor')};
	bottom: ${ui.get('switchPaddingOffset')};
	box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
	display: block;
	${ui.start(0)}
	pointer-events: none;
	position: absolute;
	top: ${ui.get('switchPaddingOffset')};
	transition: all ${ui.get('transitionDurationFast')} linear;
	width: 100%;

	input:checked ~ & {
		background: ${ui.get('switchBackdropBackgroundColorActive')};
		border-color: ${ui.get('switchBackdropBorderColorActive')};
	}
`;

export const focus = css`
	box-shadow: ${ui.get('controlPseudoBoxShadowFocus')};
`;

export const Toggle = css`
	background: ${ui.get('switchToggleBackgroundColor')};
	border: 1px solid ${ui.get('switchToggleBorderColor')};
	border-radius: ${getToggleHeight('controlHeight')};
	box-shadow: ${ui.get('switchToggleBoxShadow')};
	height: ${getToggleHeight('controlHeight')};
	pointer-events: none;
	${ui.end('initial')}
	transform: translate(0, 0);
	transition: all ${ui.get('transitionDurationFast')} linear;
	width: ${getToggleHeight('controlHeight')};

	${getTogglePosition()}

	*:active > & {
		width: ${getControlHeight('controlHeight')};
	}

	input:checked ~ & {
		background: ${ui.get('switchToggleBackgroundColorActive')};
		${ui.start('initial')}
		${ui.end(getTogglePositionX())}
	}
`;

export const toggleLarge = css`
	border-radius: ${getToggleHeight('controlHeightLarge')};
	height: ${getToggleHeight('controlHeightLarge')};
	width: ${getToggleHeight('controlHeightLarge')};

	*:active > & {
		width: ${getControlHeight('controlHeightLarge')};
	}
`;

export const toggleSmall = css`
	border-radius: ${getToggleHeight('controlHeightSmall')};
	height: ${getToggleHeight('controlHeightSmall')};
	width: ${getToggleHeight('controlHeightSmall')};

	*:active > & {
		width: ${getControlHeight('controlHeightSmall')};
	}
`;

export const formGroup = css`
	${ui.margin.start('auto')}
`;

export const backdropError = css`
	border-color: ${ui.get('controlDestructiveBorderColor')};

	input:checked ~ & {
		background: ${ui.get('controlDestructiveBorderColor')};
		border-color: ${ui.get('controlDestructiveBorderColor')};
	}
`;

export const backdropErrorFocus = css`
	border-color: transparent;
	box-shadow: ${ui.get('controlDestructivePseudoBoxShadowFocus')};
`;

function getControlHeight(height) {
	return `calc(${ui.get(height)} - calc(${ui.get(
		'switchPaddingOffset',
	)} * 2))`;
}

function getToggleHeight(height) {
	return `calc(${getControlHeight(height)} - ${ui.get(
		'switchPaddingOffset',
	)})`;
}

function getTogglePosition() {
	const value = `calc(${ui.get('switchPaddingOffset')} * 2)`;
	const top = `calc(${value} * 0.75)`;
	const left = getTogglePositionX();

	return css({
		top,
		left,
		position: 'absolute',
	});
}

function getTogglePositionX() {
	const value = `calc(${ui.get('switchPaddingOffset')} * 2)`;
	const x = `calc(${value} * 0.25)`;

	return x;
}
