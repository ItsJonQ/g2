import { css, get, styled } from '@wp-g2/styles';

export const TagView = styled.div`
	border-radius: ${get('controlBorderRadius')};
	cursor: default;
	display: flex;
	height: 20px;
	line-height: 1;
	max-width: 120px;
	padding: 0 4px;
`;

export const RemoveButtonView = styled.div`
	margin-right: -4px;
`;

export const text = css`
	padding: 3px 0;
`;
