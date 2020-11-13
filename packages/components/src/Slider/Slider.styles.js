import { css, ui } from '@wp-g2/styles';

export const Slider = css`
	appearance: none;
	background-color: transparent;
	border: 1px solid transparent;
	border-radius: ${ui.get('controlBorderRadius')};
	cursor: pointer;
	display: block;
	height: ${ui.get('controlHeight')};
	max-width: 100%;
	min-width: 0;
	padding: ${ui.space(1)};
	width: 100%;

	&:focus {
		outline: none;
	}

	&::-moz-focus-outer {
		border: 0;
	}

	&::-webkit-slider-runnable-track {
		background: linear-gradient(
			to right,
			${ui.color.admin} calc(var(--progress)),
			${ui.get('controlBackgroundDimColor')} calc(var(--progress))
		);
		border-radius: 2px;
		height: 2px;
		will-change: transform;

		*:disabled& {
			background: ${ui.get('controlBackgroundDimColor')};
		}
	}
	&::-moz-range-track {
		background: linear-gradient(
			to right,
			${ui.color.admin} calc(var(--progress)),
			${ui.get('controlBackgroundDimColor')} calc(var(--progress))
		);
		border-radius: 2px;
		height: 2px;
		will-change: transform;

		*:disabled& {
			background: ${ui.get('controlBackgroundDimColor')};
		}
	}

	&::-webkit-slider-thumb {
		appearance: none;
		background-color: ${ui.get('sliderThumbBackgroundColor')};
		border: 1px solid ${ui.get('sliderThumbBorderColor')};
		border-radius: 50%;
		box-shadow: ${ui.get('sliderThumbBoxShadow')};
		cursor: pointer;
		height: 12px;
		margin-top: -5px;
		opacity: 1;
		width: 12px;
		transition: box-shadow ease ${ui.get('transitionDurationFast')};
		will-change: transform;

		*:disabled& {
			background: ${ui.get('colorTextMuted')};
			border-color: ${ui.get('colorTextMuted')};
		}
	}
	&::-moz-range-thumb {
		appearance: none;
		background-color: ${ui.get('sliderThumbBackgroundColor')};
		border: 1px solid ${ui.get('sliderThumbBorderColor')};
		border-radius: 50%;
		box-shadow: ${ui.get('sliderThumbBoxShadow')};
		cursor: pointer;
		height: 12px;
		margin-top: -5px;
		opacity: 1;
		width: 12px;
		transition: box-shadow ease ${ui.get('transitionDurationFast')};
		will-change: transform;

		*:disabled& {
			background: ${ui.get('colorTextMuted')};
			border-color: ${ui.get('colorTextMuted')};
		}
	}

	&:focus {
		${getFocusBoxShadow()}
	}
`;

export const focused = css`
	${getFocusBoxShadow()}
`;

export const large = css`
	height: ${ui.get('controlHeightLarge')};
`;

export const small = css`
	height: ${ui.get('controlHeightSmall')};
`;

export const error = css`
	&::-webkit-slider-runnable-track {
		background: linear-gradient(
			to right,
			${ui.get('controlDestructiveBorderColor')} calc(var(--progress)),
			${ui.get('controlBackgroundDimColor')} calc(var(--progress))
		);
	}
	&::-moz-range-track {
		background: linear-gradient(
			to right,
			${ui.get('controlDestructiveBorderColor')} calc(var(--progress)),
			${ui.get('controlBackgroundDimColor')} calc(var(--progress))
		);
	}

	&::-webkit-slider-thumb {
		background-color: ${ui.get('controlDestructiveBorderColor')};
		border: 1px solid ${ui.get('controlDestructiveBorderColor')};
	}
	&::-moz-range-thumb {
		background-color: ${ui.get('controlDestructiveBorderColor')};
		border: 1px solid ${ui.get('controlDestructiveBorderColor')};
	}

	&:focus {
		${getFocusBoxShadow(
			ui.get('controlDestructivePseudoBoxShadowFocusSmall'),
		)};
	}
`;

export const focusedError = css`
	${getFocusBoxShadow(ui.get('controlDestructivePseudoBoxShadowFocusSmall'))};
`;

function getFocusBoxShadow(color = ui.get('controlPseudoBoxShadowFocusSmall')) {
	return css`
		&::-webkit-slider-thumb {
			box-shadow: ${color};
		}
		&::-moz-range-thumb {
			box-shadow: ${color};
		}
	`;
}
