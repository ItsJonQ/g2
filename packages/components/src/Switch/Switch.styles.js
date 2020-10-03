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
	padding: 4px 0;
	position: relative;
	user-select: none;
	width: ${getSwitchWidth('controlHeight')};

	&[disabled] {
		opacity: 0.6;
		pointer-events: none;
	}
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
	${ui.background.control};
	${ui.border.control.default};
	${ui.borderRadius.circle};

	bottom: 4px;
	box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
	display: block;
	left: 0;
	pointer-events: none;
	pointer-events: none;
	position: absolute;
	top: 4px;
	transition: all ${ui.get('transitionDurationFast')} linear;
	width: 100%;

	input:checked ~ & {
		${ui.background.admin};
	}
`;

export const focus = css`
	${ui.border.control.focus};

	input:checked ~ & {
		${ui.border.control.default};
	}
`;

export const Toggle = css`
	background: ${ui.get('controlPrimaryTextColor')};
	border: 1px solid ${ui.get('controlBorderColor')};
	border-radius: ${getToggleHeight('controlHeight')};
	box-shadow: ${ui.get('controlSurfaceBoxShadow')};
	height: ${getToggleHeight('controlHeight')};
	left: 2px;
	pointer-events: none;
	position: absolute;
	right: initial;
	top: 6px;
	transform: translate(0, 0);
	transition: all ${ui.get('transitionDurationFast')} linear;
	width: ${getToggleHeight('controlHeight')};

	*:active > & {
		width: ${getControlHeight('controlHeight')};
	}

	input:checked ~ & {
		left: initial;
		right: 2px;
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
	margin-left: auto;
`;

function getControlHeight(height) {
	return `calc(${ui.get(height)} - 8px)`;
}

function getToggleHeight(height) {
	return `calc(${getControlHeight(height)} - 4px)`;
}
