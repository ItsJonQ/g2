import { connect } from '@wp-g2/context';
import { BaseView, css, cx, get, getFontSize } from '@wp-g2/styles';
import { getOptimalTextShade, is } from '@wp-g2/utils';
import React from 'react';

import { Truncate } from '../Truncate';
import * as styles from './Text.styles';
import { createHighlighterText } from './Text.utils';

function Text({
	align,
	as = 'span',
	children,
	className,
	color,
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
	...props
}) {
	let content = children;
	const isHighlighter = is.array(highlightWords) && highlightWords.length;

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
		isHighlighter && styles.highlighterText,
		styles[isBlock && 'block'],
		styles[variant],
		upperCase && sx.upperCase,
		className,
	);

	const componentProps = {
		...props,
		as,
		className: classes,
	};

	if (truncate) {
		return <Truncate {...componentProps}>{content}</Truncate>;
	}

	return <BaseView {...componentProps}>{content}</BaseView>;
}

export default connect(Text, 'Text');
