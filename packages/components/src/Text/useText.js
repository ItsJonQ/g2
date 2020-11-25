import { hasNamespace, useContextSystem } from '@wp-g2/context';
import { css, cx, getFontSize, ui } from '@wp-g2/styles';
import { getOptimalTextShade, is } from '@wp-g2/utils';
import React, { useMemo } from 'react';

import { useTruncate } from '../Truncate';
import * as styles from './Text.styles';
import { createHighlighterText } from './Text.utils';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('./types').Props, 'span'>} props
 */
export function useText(props) {
	const {
		adjustLineHeightForInnerControls,
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
		lineHeight: lineHeightProp,
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

	const classes = useMemo(() => {
		const sx = {};

		const lineHeight = getLineHeight({
			lineHeight: lineHeightProp,
			adjustLineHeightForInnerControls,
		});

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
				? css({ color: ui.get('black') })
				: css({ color: ui.get('white') });
		}

		return cx(
			styles.Text,
			sx.Base,
			sx.optimalTextColor,
			isDestructive && styles.destructive,
			!!isHighlighter && styles.highlighterText,
			isBlock && styles.block,
			isCaption && styles.muted,
			variant && styles[variant],
			upperCase && sx.upperCase,
			className,
		);
	}, [
		adjustLineHeightForInnerControls,
		align,
		className,
		color,
		display,
		isBlock,
		isCaption,
		isDestructive,
		isHighlighter,
		lineHeightProp,
		optimizeReadabilityFor,
		size,
		upperCase,
		variant,
		weight,
	]);

	/** @type {undefined | 'auto' | 'none'} */
	let finalEllipsizeMode = undefined;
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

	/**
	 * Enhance child `<Link />` components to inherit font size.
	 */
	if (!truncate && is.array(children)) {
		content = React.Children.map(children, (child) => {
			// Thiis is... unfortunate. Would we rather throw a `ts-ignore` here than increase the complexity of this loop?
			if (
				is.nil(child) ||
				is.string(child) ||
				is.number(child) ||
				is.boolean(child) ||
				!('props' in child)
			) {
				return child;
			}

			const isLink = hasNamespace(child, ['Link']);
			if (isLink) {
				return React.cloneElement(child, {
					size: child.props.size || 'inherit',
				});
			}

			return child;
		});
	}

	return {
		...truncateProps,
		children: truncate ? truncateProps.children : content,
	};
}

function getLineHeight({ adjustLineHeightForInnerControls, lineHeight }) {
	if (is.defined(lineHeight)) return lineHeight;

	if (!adjustLineHeightForInnerControls) return;

	let value = `calc(${ui.get('controlHeight')} + ${ui.space(2)})`;

	switch (adjustLineHeightForInnerControls) {
		case 'large':
			value = `calc(${ui.get('controlHeightLarge')} + ${ui.space(2)})`;
			break;
		case 'small':
			value = `calc(${ui.get('controlHeightSmall')} + ${ui.space(2)})`;
			break;
		case 'xSmall':
			value = `calc(${ui.get('controlHeightXSmall')} + ${ui.space(2)})`;
			break;
		default:
			break;
	}

	return value;
}
