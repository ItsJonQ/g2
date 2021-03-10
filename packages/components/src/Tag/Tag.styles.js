import {
	css,
	getBackgroundColor,
	getBackgroundColorText,
	styled,
	ui,
} from '@wp-g2/styles';

export const TagView = styled.div`
	border-radius: ${ui.get('controlBorderRadius')};
	box-shadow: 0 0 0 1px ${ui.get('surfaceBorderColor')} inset;
	cursor: default;
	display: flex;
	height: 20px;
	line-height: 1;
	max-width: 120px;
	padding: 0 4px;
`;

export const RemoveButtonView = styled.div`
	${ui.margin.end('-4px')}
`;

export const text = css`
	padding: 3px 0;
`;

export function getBackground({ color }) {
	return css`
		${getBackgroundColor(color)}
	`;
}

export function getBackgroundText({ color }) {
	return css`
		${getBackgroundColorText(color)}
	`;
}
