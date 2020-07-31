import { css, get, styled } from '@wp-g2/styles';

function getSwitchWidth(height) {
	return `calc(${getControlHeight(height)} * 1.85);`;
}

export const SwitchView = styled.label`
	cursor: pointer;
	display: flex;
	height: ${get('controlHeight')};
	margin: 0;
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
	height: ${get('controlHeightLarge')};
	width: ${getSwitchWidth('controlHeightLarge')};
`;

export const small = css`
	height: ${get('controlHeightSmall')};
	width: ${getSwitchWidth('controlHeightSmall')};
`;

export const inputHidden = css`
	opacity: 0;
	padding: 0;
	position: absolute;
	z-index: -1;
`;

export const BackdropView = styled.div`
	background-color: ${get('controlBackgroundColor')};
	border: 1px solid ${get('controlBorderColor')};
	border-radius: 999px;
	bottom: 4px;
	box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
	display: block;
	left: 0;
	pointer-events: none;
	pointer-events: none;
	position: absolute;
	top: 4px;
	transition: all ${get('transitionDurationFast')} linear;
	width: 100%;
`;

export const focus = css`
	border-color: ${get('colorAdmin')};
	box-shadow: ${get('controlBoxShadowFocus')};
`;

export const checkedFocus = css`
	border-color: ${get('controlBorderColor')};
`;

export const backdropChecked = css`
	background-color: ${get('colorAdmin')};
`;

export const ToggleView = styled.div`
	background: ${get('controlPrimaryTextColor')};
	border: 1px solid ${get('controlBorderColor')};
	border-radius: ${getToggleHeight('controlHeight')};
	box-shadow: ${get('controlSurfaceBoxShadow')};
	height: ${getToggleHeight('controlHeight')};
	left: 2px;
	pointer-events: none;
	position: absolute;
	right: initial;
	top: 6px;
	transform: translate(0, 0);
	transition: all ${get('transitionDurationFast')} linear;
	width: ${getToggleHeight('controlHeight')};

	*:active > & {
		width: ${getControlHeight('controlHeight')};
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

export const toggleChecked = css`
	left: initial;
	right: 2px;
`;

function getControlHeight(height) {
	return `calc(${get(height)} - 8px)`;
}

function getToggleHeight(height) {
	return `calc(${getControlHeight(height)} - 4px)`;
}
