import { css, get, styled } from '@wp-g2/styles';

export const ControlLabelView = styled.div`
	color: ${get('colorText')};
	font-size: ${get('fontSize')};
	line-height: 14px;
	padding-bottom: calc((${get('controlHeight')} - 14px) / 2);
	padding-top: calc((${get('controlHeight')} - 14px) / 2);
`;

export const large = css`
	padding-bottom: calc((${get('controlHeightLarge')} - 14px) / 2);
	padding-top: calc((${get('controlHeightLarge')} - 14px) / 2);
`;

export const small = css`
	padding-bottom: calc((${get('controlHeightSmall')} - 14px) / 2);
	padding-top: calc((${get('controlHeightSmall')} - 14px) / 2);
`;
