import { css, ui } from '@wp-g2/styles';

export const Slider = css`
	appearance: none;
	background-color: transparent;
	border: 1px solid transparent;
	border-radius: ${ui.get('controlBorderRadius')};
	display: block;
	height: ${ui.get('controlHeight')};
	max-width: 100%;
	min-width: 0;
	padding: ${ui.space(1)};
	width: 100%;

	&:focus {
		border-color: ${ui.color.admin};
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

		&:disabled {
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

		&:disabled {
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
		will-change: transform;

		&:disabled {
			display: none;
		}
	}
	&::-moz-range-thumb {
		appearance: none;
		background-color: ${ui.color.white};
		border: 1px solid;
		border-color: ${ui.get('controlBorderColor')};
		border-radius: 50%;
		box-shadow: 0 0 2px rgba(0, 0, 0, 0.2),
			${ui.get('controlSurfaceBoxShadow')};
		cursor: pointer;
		height: 12px;
		margin-top: -5px;
		opacity: 1;
		width: 12px;
		will-change: transform;

		&:disabled {
			display: none;
		}
	}
`;

export const large = css`
	height: ${ui.get('controlHeightLarge')};
`;

export const small = css`
	height: ${ui.get('controlHeightSmall')};
`;
