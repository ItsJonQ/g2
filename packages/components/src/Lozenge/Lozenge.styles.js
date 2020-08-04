import { css, get, styled } from '@wp-g2/styles';

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
