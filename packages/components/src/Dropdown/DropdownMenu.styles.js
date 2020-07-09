import { styled } from '@wp-g2/styled';

export const DropdownMenuView = styled.div`
	opacity: 0;
	outline: none;
	transform-origin: top center;
	transition: opacity 120ms ease;

	&[data-enter] {
		opacity: 1;
	}
`;
