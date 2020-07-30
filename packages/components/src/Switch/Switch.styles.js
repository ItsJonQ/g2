import { css, get, styled } from '@wp-g2/styles';

export const SwitchView = styled.label`
	cursor: pointer;
	display: flex;
	height: ${get('controlHeight')};
	margin: 0;
	padding: 4px 0;
	position: relative;
	user-select: none;
	width: calc(${getControlHeight('controlHeight')} * 1.85);

	&[disabled] {
		opacity: 0.6;
		pointer-events: none;
	}
`;

export const large = css`
	height: ${get('controlHeightLarge')};
	width: calc(${getControlHeight('controlHeightLarge')} * 1.85);
`;

export const small = css`
	height: ${get('controlHeightSmall')};
	width: calc(${getControlHeight('controlHeightSmall')} * 1.85);
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
	box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) inset;
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
`;

export const checkedFocus = css`
	border-color: ${get('controlBorderColor')};
	box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1) inset;
`;

export const backdropChecked = css`
	background-color: ${get('colorAdmin')};
`;

export const ToggleView = styled.div`
	background: ${get('controlPrimaryTextColor')};
	border: 1px solid ${get('controlBorderColor')};
	border-radius: calc(${getControlHeight('controlHeight')} - 4px);
	box-shadow: ${get('controlSurfaceBoxShadow')};
	height: calc(${getControlHeight('controlHeight')} - 4px);
	left: 2px;
	pointer-events: none;
	position: absolute;
	right: initial;
	top: 6px;
	transform: translate(0, 0);
	transition: all ${get('transitionDurationFast')} linear;
	width: calc(${getControlHeight('controlHeight')} - 4px);

	*:active > & {
		width: ${getControlHeight('controlHeight')};
	}
`;

export const toggleLarge = css`
	border-radius: calc(${getControlHeight('controlHeightLarge')} - 4px);
	height: calc(${getControlHeight('controlHeightLarge')} - 4px);
	width: calc(${getControlHeight('controlHeightLarge')} - 4px);

	*:active > & {
		width: ${getControlHeight('controlHeightLarge')};
	}
`;

export const toggleSmall = css`
	border-radius: calc(${getControlHeight('controlHeightSmall')} - 4px);
	height: calc(${getControlHeight('controlHeightSmall')} - 4px);
	width: calc(${getControlHeight('controlHeightSmall')} - 4px);

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
