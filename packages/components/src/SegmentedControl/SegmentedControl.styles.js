import { css, get, styled } from '@wp-g2/styles';

export const SegmentedControl = css`
	background: ${get('controlBackgroundColor')};
	border-radius: 5px;
	display: inline-flex;
	min-width: 0;
	padding: 2px;
	position: relative;
	transition: background 100ms linear;

	&:focus {
		outline: none;
	}
`;

export const block = css`
	display: flex;
	width: 100%;
`;

export const Backdrop = css`
	background: ${get('controlBackgroundStrongColor')};
	border-radius: 4px;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
	height: 26px;
	left: 0;
	position: absolute;
	transition: all 140ms ease;
	z-index: 1;
`;

export const Label = styled.div`
	display: inline-flex;
	max-width: 100%;
	min-width: 0;
	position: relative;
`;

export const labelBlock = css`
	flex: 1;
`;

export const Button = styled.button`
	align-items: center;
	appearance: none;
	background: transparent;
	border: none;
	border-radius: 4px;
	color: ${get('colorText')};
	cursor: pointer;
	display: flex;
	height: 26px;
	justify-content: center;
	line-height: 26px;
	outline: none;
	padding: 0 12px;
	position: relative;
	text-align: center;
	transition: background 160ms linear, color 160ms linear,
		font-weight 60ms linear;
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

export const ButtonContent = styled.div`
	font-size: 12px;
	left: 50%;
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
`;

export const buttonActive = css`
	font-weight: bold;
`;

export const Separator = styled.div`
	background: ${get('colorDivider')};
	height: 18px;
	position: absolute;
	right: 0;
	top: 4px;
	transition: background 200ms linear;
	width: 1px;
`;

export const separatorActive = css`
	background: transparent;
`;

export const LabelPlaceholder = styled.div`
	font-size: 12px;
	font-weight: bold;
	height: 0;
	overflow: hidden;
	visibility: hidden;
`;
