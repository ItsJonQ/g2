import { css, getHighDpi, ui } from '@wp-g2/styles';

const lineHeight = `calc(${ui.get('fontSize')} * 1.2)`;

function getPadding(size) {
	return `calc((${ui.get(size)} - ${lineHeight}) / 2)`;
}

const highDpiAdjust = getHighDpi(css`
	> * {
		position: relative;
		top: 0.5px;
	}
`);

export const ControlLabel = css`
	line-height: ${lineHeight};
	padding-bottom: ${getPadding('controlHeight')};
	padding-top: ${getPadding('controlHeight')};

	&:active {
		user-select: none;
	}

	${highDpiAdjust};
`;

export const large = css`
	padding-bottom: ${getPadding('controlHeightLarge')};
	padding-top: ${getPadding('controlHeightLarge')};
`;

export const small = css`
	padding-bottom: ${getPadding('controlHeightSmall')};
	padding-top: ${getPadding('controlHeightSmall')};
`;
