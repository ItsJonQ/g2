import { css, styled, ui } from '@wp-g2/styles';

export const SegmentedControl = css`
	background: ${ui.get('controlBackgroundColor')};
	border: 1px solid;
	border-color: ${ui.get('controlBorderColor')};
	border-radius: calc(${ui.get('controlBorderRadius')} + 1px);
	display: inline-flex;
	min-height: ${ui.get('controlHeight')};
	min-width: 0;
	padding: 1px;
	position: relative;
	transition: all ${ui.get('transitionDurationFastest')} linear;

	&:hover {
		border-color: ${ui.get('controlBorderColorHover')};
	}

	&:focus {
		border-color: ${ui.color.admin};
		box-shadow: ${ui.get('controlBoxShadowFocus')};
		outline: none;
		z-index: 1;
	}
`;

export const block = css`
	display: flex;
	width: 100%;
`;

export const BackdropView = styled.div`
	background: ${ui.get('segmentedControlBackdropBackgroundColor')};
	border: 1px solid ${ui.get('segmentedControlBackdropBorderColor')};
	border-radius: ${ui.get('controlBorderRadius')};
	box-shadow: ${ui.get('segmentedControlBackdropBoxShadow')};
	height: calc(${ui.get('controlHeight')} - 4px);
	left: 0;
	position: absolute;
	transition: all ${ui.get('transitionDurationFast')} ease;
	z-index: 1;
`;

export const LabelView = styled.div`
	display: inline-flex;
	max-width: 100%;
	min-width: 0;
	position: relative;
`;

export const labelBlock = css`
	flex: 1;
`;

export const ButtonView = styled.button`
	align-items: center;
	appearance: none;
	background: transparent;
	border: none;
	border-radius: ${ui.get('controlBorderRadius')};
	color: ${ui.color.text};
	cursor: pointer;
	display: flex;
	height: 100%;
	justify-content: center;
	line-height: 100%;
	outline: none;
	padding: 0 12px;
	position: relative;
	text-align: center;
	transition: background ${ui.get('transitionDurationFast')} linear,
		color ${ui.get('transitionDurationFast')} linear,
		font-weight 60ms linear;
	user-select: none;
	width: 100%;
	z-index: 2;

	&::-moz-focus-inner {
		border: 0;
	}

	&:active {
		background: ${ui.get('controlBackgroundColor')};
	}
`;

export const ButtonContentView = styled.div`
	font-size: ${ui.get('segmentedControlFontSize')};
	left: 50%;
	line-height: 1;
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
`;

export const buttonActive = css`
	color: ${ui.get('controlTextActiveColor')};
	font-weight: bold;
`;

export const SeparatorView = styled.div`
	background: ${ui.get('colorDivider')};
	height: calc(100% - 4px - 4px);
	position: absolute;
	right: 0;
	top: 4px;
	transition: background ${ui.get('transitionDuration')} linear;
	width: 1px;
`;

export const separatorActive = css`
	background: transparent;
`;

export const LabelPlaceholderView = styled.div`
	font-size: ${ui.get('segmentedControlFontSize')};
	font-weight: bold;
	height: 0;
	overflow: hidden;
	visibility: hidden;
`;

export const large = css`
	min-height: ${ui.get('controlHeightLarge')};
`;

export const small = css`
	min-height: ${ui.get('controlHeightSmall')};
`;
