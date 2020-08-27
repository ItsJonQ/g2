import { get, styled, ui } from '@wp-g2/styles';

export const PopoverContentView = styled.div`
	${ui.zIndex('Popover')};
	opacity: 0;
	outline: none;
	transform-origin: center center;
	transition: opacity ${get('transitionDurationFastest')} linear;
	width: 100%;

	&[data-enter] {
		opacity: 1;
	}
`;
