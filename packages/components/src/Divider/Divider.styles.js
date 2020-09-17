import { styled, ui } from '@wp-g2/styles';

export const DividerView = styled.hr`
	border-color: ${ui.get('colorDivider')};
	border-width: 0 0 1px 0;
	height: 0;
	margin: 0;
	width: auto;
`;
