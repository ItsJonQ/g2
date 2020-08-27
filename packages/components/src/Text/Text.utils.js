import { ns } from '@wp-g2/styles';
import { is, memoize } from '@wp-g2/utils';
import { findAll } from 'highlight-words-core';
import { createElement } from 'react';

/**
 * Source:
 * https://github.com/bvaughn/react-highlight-words/blob/master/src/Highlighter.js
 */

export function createHighlighterText({
	activeClassName = '',
	activeIndex = -1,
	activeStyle,
	autoEscape,
	caseSensitive = false,
	children,
	findChunks,
	highlightClassName = '',
	highlightStyle = {},
	highlightTag = 'mark',
	sanitize,
	searchWords = [],
	unhighlightClassName = '',
	unhighlightStyle,
}) {
	if (!children) return null;
	if (!is.string(children)) return children;

	const textToHighlight = children;

	const chunks = findAll({
		autoEscape,
		caseSensitive,
		findChunks,
		sanitize,
		searchWords,
		textToHighlight,
	});
	const HighlightTag = highlightTag;
	let highlightIndex = -1;
	let highlightClassNames = '';
	let highlightStyles;

	const lowercaseProps = (object) => {
		const mapped = {};
		for (let key in object) {
			mapped[key.toLowerCase()] = object[key];
		}
		return mapped;
	};

	const memoizedLowercaseProps = memoize(lowercaseProps);

	const textContent = chunks.map((chunk, index) => {
		const text = textToHighlight.substr(
			chunk.start,
			chunk.end - chunk.start,
		);

		if (chunk.highlight) {
			highlightIndex++;

			let highlightClass;
			if (typeof highlightClassName === 'object') {
				if (!caseSensitive) {
					highlightClassName = memoizedLowercaseProps(
						highlightClassName,
					);
					highlightClass = highlightClassName[text.toLowerCase()];
				} else {
					highlightClass = highlightClassName[text];
				}
			} else {
				highlightClass = highlightClassName;
			}

			const isActive = highlightIndex === +activeIndex;

			highlightClassNames = `${highlightClass} ${
				isActive ? activeClassName : ''
			}`;
			highlightStyles =
				isActive === true && activeStyle != null
					? Object.assign({}, highlightStyle, activeStyle)
					: highlightStyle;

			const props = {
				...ns('TextHighlight'),
				children: text,
				className: highlightClassNames,
				key: index,
				style: highlightStyles,
			};

			// Don't attach arbitrary props to DOM elements; this triggers React DEV warnings (https://fb.me/react-unknown-prop)
			// Only pass through the highlightIndex attribute for custom components.
			if (typeof HighlightTag !== 'string') {
				props.highlightIndex = highlightIndex;
			}

			return createElement(HighlightTag, props);
		} else {
			return createElement('span', {
				...ns('Text'),
				children: text,
				className: unhighlightClassName,
				key: index,
				style: unhighlightStyle,
			});
		}
	});

	return textContent;
}
