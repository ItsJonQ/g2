import { css, styled, ui } from '@wp-g2/styles';

const colorControlHeight = 16;
const alphaPatternSvg =
	'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><rect x="8" width="8" height="8"/><rect y="8" width="8" height="8"/></svg>';

/**
 * Styles absorbed from:
 * https://github.com/omgovich/react-colorful/blob/master/src/css/styles.css
 */
export const ColorPickerView = styled.div`
	.react-colorful {
		cursor: default;
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 128px;
		user-select: none;
		width: 100%;
	}

	.react-colorful,
	.react-colorful__saturation {
		position: relative;
	}

	.react-colorful__hue {
		border-top-left-radius: ${ui.get('controlBorderRadius')};
		border-top-right-radius: ${ui.get('controlBorderRadius')};
		order: 1;
	}

	.react-colorful__saturation {
		order: 2;
	}

	.react-colorful__alpha {
		border-bottom-left-radius: ${ui.get('controlBorderRadius')};
		border-bottom-right-radius: ${ui.get('controlBorderRadius')};
		order: 3;
	}

	.react-colorful__saturation {
		flex-grow: 1;
		border-bottom: ${ui.value.px(colorControlHeight / 2)} solid #000;
		background-image: linear-gradient(0deg, #000, transparent),
			linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0));
	}

	._1pdeC,
	.react-colorful__alpha-pointer:after,
	.react-colorful__hue-pointer:after,
	.react-colorful__saturation-pointer:after,
	.react-colorful__alpha:after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		pointer-events: none;
		border-radius: inherit;
	}

	.react-colorful__saturation,
	.react-colorful__alpha:after {
		box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
	}

	.react-colorful__hue,
	.react-colorful__alpha {
		position: relative;
		height: ${ui.value.px(colorControlHeight)};
	}

	.react-colorful__hue {
		background: linear-gradient(
			90deg,
			red,
			#ff0 17%,
			#0f0 33%,
			#0ff 50%,
			#00f 67%,
			#f0f 83%,
			red
		);
	}

	._3nKPH {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		border-radius: inherit;
		touch-action: none;
		outline: none;
	}

	._3nKPH:focus {
		.react-colorful__alpha-pointer,
		.react-colorful__hue-pointer,
		.react-colorful__saturation-pointer {
			transform: translate(-50%, -50%) scale(1.1);
		}
	}

	.react-colorful__alpha-pointer,
	.react-colorful__hue-pointer,
	.react-colorful__saturation-pointer {
		position: absolute;
		z-index: 1;
		box-sizing: border-box;
		height: ${ui.value.px(colorControlHeight + 4)};
		width: ${ui.value.px(colorControlHeight + 4)};
		transform: translate(-50%, -50%);
		background-color: #fff;
		border: 2px solid #fff;
		border-radius: 50%;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

		&:after {
			background-color: currentColor;
		}
	}

	.react-colorful__alpha {
		background-color: #fff;
		background-image: url('${alphaPatternSvg}');
	}

	.react-colorful__saturation {
		.react-colorful__alpha-pointer,
		.react-colorful__hue-pointer,
		.react-colorful__saturation-pointer {
			z-index: 3;
		}
	}

	.react-colorful__hue ._3vRUF {
		.react-colorful__alpha-pointer,
		.react-colorful__hue-pointer,
		.react-colorful__saturation-pointer {
			z-index: 2;
		}
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
	pointer-events: none;
	text-align: left;
	user-select: none;
	width: 16px;
`;

export const ColorPreview = css`
	${ui.animation.default};
	cursor: pointer;

	&:active {
		opacity: 0.6;
	}
`;
