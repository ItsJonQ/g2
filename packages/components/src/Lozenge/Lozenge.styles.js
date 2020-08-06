import {
	css,
	get,
	getBackgroundColor,
	getBackgroundColorText,
	styled,
} from '@wp-g2/styles';

export const LozengeView = styled.div`
	border-radius: ${get('controlBorderRadius')};
	cursor: default;
	display: flex;
	height: 18px;
	line-height: 1;
	max-width: 120px;
	padding: 0 4px;
`;

export const text = css`
	padding: 4px 0;
`;

export function getBackground({ color, isBold }) {
	return css`
		${getBackgroundColor(color, { isBold })}
	`;
}

export function getBackgroundText({ color, isBold }) {
	return css`
		${getBackgroundColorText(color, { isBold })}
	`;
}
