import { css, get, styled, ui } from '@wp-g2/styles';

export const RadioWrapperView = styled.div`
	${ui.alignment.content.center};

	display: inline-flex;
	height: ${get('controlHeight')};
	position: relative;
	vertical-align: middle;
`;

export const Radio = css`
	${ui.border.control.subtle};
	${ui.borderRadius.circle};

	appearance: none;
	cursor: pointer;
	height: 16px;
	margin: 0;
	outline: none;
	padding: 0;
	width: 16px;

	&:focus {
		${ui.border.control.focus};
	}

	&:checked {
		${ui.border.control.focus};
	}

	&:disabled {
		opacity: 0.5;
	}
`;

export const RadioIconView = styled.div`
	${ui.font.color.white};
	${ui.alignment.content.center};

	bottom: 0;
	left: 0;
	opacity: 0;
	pointer-events: none;
	position: absolute;
	right: 0;
	top: 0;
	transition: opacity ${get('transitionDurationFastest')} linear;

	input:checked + & {
		opacity: 1;
	}
`;

export const RadioDotView = styled.div`
	${ui.background.admin};
	${ui.borderRadius.circle};
	height: 10px;
	width: 10px;
`;
