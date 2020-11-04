import { css, styled, ui } from '@wp-g2/styles';

export const Point = styled.span`
	background: currentColor;
	box-sizing: border-box;
	color: ${ui.get('lightGray700')};
	display: grid;
	height: 6px;
	margin: auto;
	transition: all 120ms linear;
	width: 6px;

	*:hover > & {
		color: ${ui.get('colorAdmin')};
	}
`;

export const CellView = styled.span`
	align-items: center;
	appearance: none;
	border: none;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	margin: 0;
	outline: none;
	padding: 0;
	position: relative;
`;

export const activePointStyles = css`
	box-shadow: 0 0 0 2px ${ui.get('black')};
	color: ${ui.get('black')};

	*:hover > & {
		color: ${ui.get('black')};
	}
`;
