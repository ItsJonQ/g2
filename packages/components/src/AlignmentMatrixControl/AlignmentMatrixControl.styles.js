import { css, styled, ui } from '@wp-g2/styles';

export const AlignmentMatrixControlView = styled.div`
	border: 1px solid transparent;
	border-radius: ${ui.get('controlBorderRadius')};
	cursor: pointer;
	display: grid;
	grid-template-columns: auto;
	grid-template-rows: repeat(3, calc(92px / 3));
	outline: none;
	width: 92px;
`;

export const RowView = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
`;

export const PointView = styled.span`
	background: currentColor;
	color: ${ui.get('lightGray700')};
	display: grid;
	height: 6px;
	margin: auto;
	transition: all ${ui.get('transitionDurationFaster')} linear;
	width: 6px;

	*:hover > & {
		color: ${ui.get('colorAdmin')};
	}
`;

export const CellView = styled.span`
	align-items: center;
	appearance: none;
	border: none;
	display: flex;
	justify-content: center;
	margin: 0;
	outline: none;
	padding: 0;
	position: relative;
`;

export const activePoint = css`
	box-shadow: 0 0 0 2px ${ui.get('black')};
	color: ${ui.get('black')};

	*:hover > & {
		color: ${ui.get('black')};
	}
`;
