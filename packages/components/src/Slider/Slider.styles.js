import { css, styled, ui } from '@wp-g2/styles';

export const SliderView = styled.input`
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
		border-color: ${ui.get('colorAdmin')};
		outline: none;
	}

	&::-moz-focus-outer {
		border: 0;
	}

	&::-webkit-slider-runnable-track {
		background: linear-gradient(
			to right,
			${ui.get('colorAdmin')} calc(var(--progress)),
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
			${ui.get('colorAdmin')} calc(var(--progress)),
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
		background-color: ${ui.get('white')};
		border: 1px solid ${ui.get('controlBorderColor')};
		border-radius: 50%;
		box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3),
			0px 1px 1px 0px rgba(0, 0, 0, 0.3);
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
		background-color: ${ui.get('white')};
		border: 1px solid ${ui.get('controlBorderColor')};
		border-radius: 50%;
		box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3),
			0px 1px 1px 0px rgba(0, 0, 0, 0.3);
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
