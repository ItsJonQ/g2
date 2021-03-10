import { css, styled, ui } from '@wp-g2/styles';

const alphaPatternSvg = `url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')`;

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
		position: relative;
		min-height: 128px;
		user-select: none;
		width: 100%;
	}

	.react-colorful__saturation {
		position: relative;
		flex-grow: 1;
		border-bottom: 8px solid #000;
		border-radius: 0;
		background-image: linear-gradient(to top, #000, rgba(0, 0, 0, 0)),
			linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
	}

	.react-colorful__pointer-fill,
	.react-colorful__alpha-gradient {
		content: '';
		position: absolute;
		${ui.start(0)}
		top: 0;
		${ui.end(0)}
		bottom: 0;
		pointer-events: none;
		border-radius: inherit;
	}

	/* Improve elements rendering on light backgrounds */
	.react-colorful__alpha-gradient,
	.react-colorful__saturation {
		box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
	}

	.react-colorful__hue,
	.react-colorful__alpha {
		position: relative;
		height: 16px;
	}

	.react-colorful__hue {
		border-radius: 3px 3px 0 0;
		background: linear-gradient(
			to right,
			#f00 0%,
			#ff0 17%,
			#0f0 33%,
			#0ff 50%,
			#00f 67%,
			#f0f 83%,
			#f00 100%
		);
	}

	.react-colorful__last-control {
		border-radius: 0 0 3px 3px;
	}

	.react-colorful__interactive {
		position: absolute;
		${ui.start(0)}
		top: 0;
		${ui.end(0)}
		bottom: 0;
		border-radius: inherit;
		outline: none;
		/* Don't trigger the default scrolling behavior when the event is originating from this element */
		touch-action: none;
	}

	.react-colorful__pointer {
		position: absolute;
		z-index: 1;
		box-sizing: border-box;
		width: 20px;
		height: 20px;
		transform: translate(-50%, -50%);
		background-color: #fff;
		border: 2px solid #fff;
		border-radius: 50%;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.react-colorful__interactive:focus .react-colorful__pointer {
		transform: translate(-50%, -50%) scale(1.1);
	}

	/* Chessboard-like pattern for alpha related elements */
	.react-colorful__alpha,
	.react-colorful__alpha-pointer {
		background-color: #fff;
		background-image: ${alphaPatternSvg};
	}

	/* Display the saturation pointer over the hue one */
	.react-colorful__saturation-pointer {
		z-index: 3;
	}

	/* Display the hue pointer over the alpha one */
	.react-colorful__hue-pointer {
		z-index: 2;
	}

	.react-colorful__hue {
		order: 0;
	}

	.react-colorful__saturation {
		order: 1;
	}

	.react-colorful__alpha {
		order: 2;
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
