import { css, styled, ui } from '@wp-g2/styles';

export const ColorCircleView = styled.div`
	${ui.borderRadius.circle()};
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1) inset;
	outline: none;
	position: relative;
`;

export const large = css`
	height: 30px;
	width: 30px;
`;

export const medium = css`
	height: 24px;
	width: 24px;
`;

export const small = css`
	height: 20px;
	width: 20px;
`;

export const active = css``;

export const interactive = css`
	${ui.animation.default};
	cursor: pointer;

	&::before {
		${ui.borderRadius.circle()};
		border: 2px solid ${ui.color.admin};
		content: '';
		height: calc(100% + 8px);
		${ui.start('-4px')}
		position: absolute;
		top: -4px;
		width: calc(100% + 8px);
		opacity: 0;
	}

	&:active {
		opacity: 0.6;
	}

	&:focus {
		&::before {
			opacity: 1;
		}
	}
`;

export const pill = css`
	border-radius: 9999px;
	width: 100%;
`;

export const expand = css`
	&[aria-expanded='true'] {
		${active};
	}
`;

export const CheckboxIconView = styled.div`
	${ui.font.color.white};
	${ui.alignment.content.center};
	bottom: 0;

	${ui.start(0)}
	opacity: 0;
	pointer-events: none;
	position: absolute;
	${ui.end(0)}
	transition: opacity ${ui.get('transitionDurationFastest')} linear;

	[data-active='true'] > & {
		opacity: 1;
	}
`;
