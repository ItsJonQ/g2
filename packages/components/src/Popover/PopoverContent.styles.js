import { styled } from '@g2/css';

export const PopoverContentView = styled.div`
	opacity: 0;
	opacity: 0;
	outline: none;
	transform-origin: top center;
	transition: opacity 120ms ease;

	&[data-enter] {
		opacity: 1;
	}
`;
