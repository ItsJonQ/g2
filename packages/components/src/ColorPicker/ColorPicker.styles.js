import { css, styled, ui } from '@wp-g2/styles';

export const ColorPickerView = styled.div`
	.react-colorful {
		width: 100%;
		height: 100%;
		min-height: 128px;
	}

	.react-colorful__hue,
	.react-colorful__alpha {
		height: 16px;
	}

	.react-colorful__last-control {
		border-radius: 0 0 3px 3px;
	}

	.react-colorful__pointer {
		width: 20px;
		height: 20px;
	}

	.react-colorful__hue {
		order: -1;
		border-radius: 3px 3px 0 0;
	}

	.react-colorful__saturation {
		border-radius: 0;
	}
`;

export const disableAlpha = css`
	.react-colorful__alpha {
		display: none;
	}

	.react-colorful__saturation {
		border-bottom-left-radius: ${ui.get('controlBorderRadius')};
		border-bottom-right-radius: ${ui.get('controlBorderRadius')};
	}
`;

export const suffixText = css`
	margin: 0 !important;
	pointer-events: none;
	text-align: left;
	user-select: none;
	width: 10px;
`;

export const ColorPreview = css`
	${ui.animation.default};
	cursor: pointer;

	&:active {
		opacity: 0.6;
	}
`;
