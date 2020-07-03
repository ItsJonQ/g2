import { css, styled } from '@g2/css';

const baseStyles = () => {
	return css`
		height: 100%;
		overflow-y: auto;
	`;
};

export const ScrollableView = styled.div`
	${baseStyles};
`;

export const ContentView = styled.div`
	position: relative;
`;
