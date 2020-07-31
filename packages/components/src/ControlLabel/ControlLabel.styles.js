import { css, get, styled } from '@wp-g2/styles';

const lineHeight = `calc(${get('fontSize')} * 1.2)`;

function getPadding(size) {
	return `calc((${get(size)} - ${lineHeight}) / 2)`;
}

export const ControlLabelView = styled.div`
	line-height: ${lineHeight};
	padding-bottom: ${getPadding('controlHeight')};
	padding-top: ${getPadding('controlHeight')};
`;

export const large = css`
	padding-bottom: ${getPadding('controlHeightLarge')};
	padding-top: ${getPadding('controlHeightLarge')};
`;

export const small = css`
	padding-bottom: ${getPadding('controlHeightSmall')};
	padding-top: ${getPadding('controlHeightSmall')};
`;
