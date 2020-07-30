import { css, get, styled } from '@wp-g2/styles';

export const SliderView = styled.input`
	appearance: none;
	background-color: transparent;
	border: 1px solid transparent;
	border-radius: ${get('controlBorderRadius')};
	display: block;
	height: ${get('controlHeight')};
	max-width: 100%;
	min-width: 0;
	padding: 4px;
	width: 100%;

	&:focus {
		border-color: ${get('colorAdmin')};
		outline: none;
	}

	&::-moz-focus-outer {
		border: 0;
	}

	&::-webkit-slider-runnable-track {
		background: linear-gradient(
			to right,
			${get('colorAdmin')} calc(var(--progress)),
			${get('controlBackgroundDimColor')} calc(var(--progress))
		);
		border-radius: 2px;
		height: 2px;
		will-change: transform;

		&:disabled {
			background: ${get('controlBackgroundDimColor')};
		}
	}
	&::-moz-range-track {
		background: linear-gradient(
			to right,
			${get('colorAdmin')} calc(var(--progress)),
			${get('controlBackgroundDimColor')} calc(var(--progress))
		);
		border-radius: 2px;
		height: 2px;
		will-change: transform;

		&:disabled {
			background: ${get('controlBackgroundDimColor')};
		}
	}

	&::-webkit-slider-thumb {
		appearance: none;
		background-color: ${get('white')};
		border: 1px solid ${get('controlBorderColor')};
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
		background-color: ${get('white')};
		border: 1px solid ${get('controlBorderColor')};
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
	height: ${get('controlHeightLarge')};
`;

export const small = css`
	height: ${get('controlHeightSmall')};
`;
