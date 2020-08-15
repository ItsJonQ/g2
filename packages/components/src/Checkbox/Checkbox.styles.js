import { css, get, styled, ui } from '@wp-g2/styles';

export const CheckboxWrapperView = styled.div`
	${ui.alignment.content.center};

	display: inline-flex;
	height: ${get('controlHeight')};
	position: relative;
	vertical-align: middle;
`;

export const Checkbox = css`
	${ui.border.control.subtle};
	${ui.borderRadius.round};

	appearance: none;
	cursor: pointer;
	height: 16px;
	margin: 0;
	outline: none;
	padding: 0;
	transition: background ${get('transitionDurationFastest')} linear;
	width: 16px;

	&:focus {
		${ui.border.control.focus};
	}

	&:checked {
		${ui.background.admin};
		${ui.border.control.focus};
	}

	&:disabled {
		opacity: 0.5;
	}
`;

export const CheckboxIconView = styled.div`
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
