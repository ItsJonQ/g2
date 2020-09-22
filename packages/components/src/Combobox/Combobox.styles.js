import { css, styled, ui } from '@wp-g2/styles';

export const ComboboxView = styled.div``;

export const ComboboxMenu = css`
	${ui.zIndex('Dropdown', 9998)};
	min-width: 200px;
	opacity: 0;
	transform-origin: top center;
	transition: opacity ${ui.get('transitionDurationFastest')} ease;

	&[data-enter] {
		opacity: 1;
	}
`;
