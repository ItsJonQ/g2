import { css, get, styled } from '@wp-g2/styles';

export const ControlLabelView = styled.div`
	color: ${get('colorText')};
	font-size: ${get('fontSize')};
	line-height: 14px;
	padding-bottom: 11px;
	padding-top: 11px;
`;

export const large = css`
	padding-bottom: 13px;
	padding-top: 13px;
`;

export const small = css`
	padding-bottom: 9px;
	padding-top: 9px;
`;
