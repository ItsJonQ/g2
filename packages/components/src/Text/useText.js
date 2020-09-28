import { useContextSystem } from '@wp-g2/context';
import { css, cx, get, getFontSize } from '@wp-g2/styles';
import { getOptimalTextShade, is } from '@wp-g2/utils';

import { useTruncate } from '../Truncate';
import * as styles from './Text.styles';
import { createHighlighterText } from './Text.utils';

export function useText(props) {
	const {
		align,
		children,
		className,
		color,
		ellipsizeMode,
		isDestructive = false,
		display,
		highlightEscape = false,
		highlightCaseSensitive = false,
		highlightWords = [],
		highlightSanitize,
		isBlock = false,
		lineHeight = 1.2,
		optimizeReadabilityFor,
		size,
		truncate = false,
		upperCase = false,
		variant,
		weight = 400,
		...otherProps
	} = useContextSystem(props, 'Text');

	let content = children;
	const isHighlighter = is.array(highlightWords) && highlightWords.length;
	const isCaption = size === 'caption';

	if (isHighlighter) {
		content = createHighlighterText({
			autoEscape: highlightEscape,
			children,
			caseSensitive: highlightCaseSensitive,
			searchWords: highlightWords,
			sanitize: highlightSanitize,
		});
	}

	const sx = {};

	sx.Base = css({
		color,
		display,
		fontSize: getFontSize(size),
		fontWeight: weight,
		lineHeight,
		textAlign: align,
	});

	sx.upperCase = css({ textTransform: 'uppercase' });

	sx.optimalTextColor = null;

	if (optimizeReadabilityFor) {
		const isOptimalTextColorDark =
			getOptimalTextShade(optimizeReadabilityFor) === 'dark';

		sx.optimalTextColor = isOptimalTextColorDark
			? css({ color: get('black') })
			: css({ color: get('white') });
	}

	const classes = cx(
		styles.Text,
		sx.Base,
		sx.optimalTextColor,
		isDestructive && styles.destructive,
		isHighlighter && styles.highlighterText,
		styles[isBlock && 'block'],
		isCaption && styles.muted,
		styles[variant],
		upperCase && sx.upperCase,
		className,
	);

	let finalEllipsizeMode = 'undefined';
	if (truncate === true) {
		finalEllipsizeMode = 'auto';
	}
	if (truncate === false) {
		finalEllipsizeMode = 'none';
	}

	const finalComponentProps = {
		...otherProps,
		className: classes,
		children,
		ellipsizeMode: ellipsizeMode || finalEllipsizeMode,
	};

	const truncateProps = useTruncate(finalComponentProps);

	return {
		...truncateProps,
		children: truncate ? truncateProps.children : content,
	};
}
