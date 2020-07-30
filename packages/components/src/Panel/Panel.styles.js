import { css, get, styled } from '@wp-g2/styles';

export const Panel = css`
	& + & {
		border-top: 1px solid ${get('colorDivider')};
	}
`;

export const PanelHeader = css`
	cursor: pointer;
	outline: none;
	padding: 12px 12px;
`;

export const seamless = css`
	padding-left: 0;
	padding-right: 0;
`;

export const PanelBodyView = styled.div`
	padding: 8px 12px 12px;
`;
