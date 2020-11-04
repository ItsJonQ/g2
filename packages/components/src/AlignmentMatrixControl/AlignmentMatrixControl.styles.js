import { css, styled } from '@wp-g2/styles';

export const AlignmentMatrixControlView = styled.div``;

export const Row = styled.div`
	box-sizing: border-box;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
`;

const rootBase = css`
	border-radius: 2px;
	box-sizing: border-box;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	outline: none;
`;

const rootSize = css`
	grid-template-rows: repeat(3, calc(92px / 3));
	width: 92px;
`;

export const Root = styled.div`
	${rootBase};

	border: 1px solid transparent;
	cursor: pointer;
	grid-template-columns: auto;

	${rootSize};
`;
