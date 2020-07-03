import { css, styled } from '@g2/css';

const baseStyles = ({ borderRadius, offset, theme, value }) => {
	return css`
		overflow-y: auto;
	`;
};

export const ScrollableView = styled.div`
	${baseStyles};
`;

export const ContentView = styled.div`
	position: relative;
`;
