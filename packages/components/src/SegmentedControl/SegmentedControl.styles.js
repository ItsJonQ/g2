import { css, get, styled } from '@wp-g2/styles';

export const SegmentedControl = css`
	background: ${get('controlBackgroundColor')};
	border: 1px solid ${get('controlBorderColor')};
	border-radius: calc(${get('controlBorderRadius')} + 1px);
	display: inline-flex;
	min-height: ${get('controlHeight')};
	min-width: 0;
	padding: 1px;
	position: relative;
	transition: all ${get('transitionDurationFastest')} linear;

	&:focus {
		border-color: ${get('colorAdmin')};
		box-shadow: 0 0 0 2px ${get('controlBackgroundDimColor')};
		outline: none;
		z-index: 1;
	}
`;

export const block = css`
	display: flex;
	width: 100%;
`;

export const BackdropView = styled.div`
	background: ${get('controlSurfaceColor')};
	border: 1px solid ${get('controlBorderColor')};
	border-radius: ${get('controlBorderRadius')};
	box-shadow: ${get('controlSurfaceBoxShadow')};
	height: calc(${get('controlHeight')} - 4px);
	left: 0;
	position: absolute;
	transition: all ${get('transitionDurationFast')} ease;
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
	border-radius: ${get('controlBorderRadius')};
	color: ${get('colorText')};
	cursor: pointer;
	display: flex;
	height: 100%;
	justify-content: center;
	line-height: 100%;
	outline: none;
	padding: 0 12px;
	position: relative;
	text-align: center;
	transition: background ${get('transitionDurationFast')} linear,
		color ${get('transitionDurationFast')} linear, font-weight 60ms linear;
	user-select: none;
	width: 100%;
	z-index: 2;

	&::-moz-focus-inner {
		border: 0;
	}

	&:active {
		background: ${get('controlBackgroundColor')};
	}
`;

export const ButtonContentView = styled.div`
	font-size: 12px;
	left: 50%;
	line-height: 1;
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
`;

export const buttonActive = css`
	color: ${get('controlTextActiveColor')};
	font-weight: bold;
`;

export const SeparatorView = styled.div`
	background: ${get('colorDivider')};
	height: calc(100% - 4px - 4px);
	position: absolute;
	right: 0;
	top: 4px;
	transition: background ${get('transitionDuration')} linear;
	width: 1px;
`;

export const separatorActive = css`
	background: transparent;
`;

export const LabelPlaceholderView = styled.div`
	font-size: 12px;
	font-weight: bold;
	height: 0;
	overflow: hidden;
	visibility: hidden;
`;

export const large = css`
	min-height: ${get('controlHeightLarge')};
`;

export const small = css`
	min-height: ${get('controlHeightSmall')};
`;
