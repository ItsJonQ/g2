import { css, styled, ui } from '@wp-g2/styles';

export const CheckboxWrapper = css`
	${ui.alignment.content.center};
	display: inline-flex;
	height: ${ui.get('controlHeight')};
	position: relative;
	vertical-align: middle;
`;

export const CheckboxWrapperView = styled.div`
	${CheckboxWrapper};
`;

export const Checkbox = css`
	${ui.border.control.subtle()};
	${ui.borderRadius.round()};

	appearance: none;
	box-shadow: ${ui.get('checkboxBoxShadow')};
	cursor: pointer;
	display: block;
	height: ${ui.get('checkboxSize')};
	line-height: 0;
	margin: 0;
	min-height: ${ui.get('checkboxSize')};
	min-width: ${ui.get('checkboxSize')};
	outline: none;
	padding: 0;
	transition: background ${ui.get('transitionDurationFastest')} linear;
	width: ${ui.get('checkboxSize')};

	&::before,
	&::after {
		display: none;
	}

	&:focus {
		${ui.border.control.focus()};
	}

	&:checked {
		${ui.background.admin};
		${ui.border.control.focus()};
	}

	&:disabled {
		${ui.opacity.muted};
	}
`;

export const CheckboxIcon = css`
	${ui.font.color.white};
	${ui.alignment.content.center};

	bottom: 0;
	${ui.start(0)}
	opacity: 0;
	pointer-events: none;
	position: absolute;
	${ui.end(0)}
	top: 0;
	transition: opacity ${ui.get('transitionDurationFastest')} linear;

	input:checked + & {
		opacity: 1;
	}
`;

export const CheckboxIconView = styled.div`
	${CheckboxIcon};
`;
