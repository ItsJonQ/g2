import { getFontSize } from '../mixins';
import { css, cx } from '../style-system';

const fontStyles = {
	bold: css({ fontWeight: 600 }),
	italic: css({ fontStyle: 'italic' }),
	smallCaps: css({
		fontSize: getFontSize(10),
		fontWeight: 600,
		textTransform: 'uppercase',
	}),
};

const fontSizes = {
	body: css({ fontSize: getFontSize(13) }),
	caption: css({ fontSize: getFontSize(10) }),
	footnote: css({ fontSize: getFontSize(11) }),
	headline: cx([fontStyles.bold, css({ fontSize: getFontSize(13) })]),
	largeTitle: css({ fontSize: getFontSize(28) }),
	subheadline: css({ fontSize: getFontSize(12) }),
	title: css({ fontSize: getFontSize(20) }),
};

export const font = {
	...fontSizes,
	...fontStyles,
	size: (size) => css({ fontSize: getFontSize(size) }),
};
