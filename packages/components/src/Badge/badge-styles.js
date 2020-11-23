import {
	css,
	getBackgroundColor,
	getBackgroundColorText,
	styled,
	ui,
} from '@wp-g2/styles';

export const BadgeView = styled.div`
	border-radius: ${ui.get('controlBorderRadius')};
	box-shadow: 0 0 0 1px ${ui.get('surfaceBorderColor')} inset;
	cursor: default;
	display: flex;
	height: 18px;
	line-height: 1;
	padding: 0 4px;
`;

export const truncate = css`
	max-width: 120px;
`;

export const text = css`
	padding: 4px 0;
`;

export const rounded = css`
	${ui.borderRadius.circle};
	justify-content: center;
	min-width: 18px;
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
