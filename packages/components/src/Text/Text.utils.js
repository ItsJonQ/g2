import { ui } from '@wp-g2/styles';
import { memoize } from '@wp-g2/utils';
import { findAll } from 'highlight-words-core';
import { createElement } from 'react';

/**
 * Source:
 * https://github.com/bvaughn/react-highlight-words/blob/master/src/Highlighter.js
 */

/**
 * @typedef Options
 * @property {string} [activeClassName]
 * @property {number} [activeIndex]
 * @property {import('react').AllHTMLAttributes['style']} [activeStyle]
 * @property {boolean} [autoEscape]
 * @property {boolean} [caseSensitive=false]
 * @property {import('react').ReactNode} children
 * @property {import('highlight-words-core').FindAllArgs['findChunks']} [findChunks]
 * @property {string | object} [highlightClassName]
 * @property {import('react').AllHTMLAttributes['style']} [highlightStyle]
 * @property {string} [highlightTag]
 * @property {import('highlight-words-core').FindAllArgs['sanitize']} [sanitize]
 * @property {string[]} [searchWords]
 * @property {string} [unhighlightClassName]
 * @property {import('react').AllHTMLAttributes['style']} [unhighlightStyle]
 */

/**
 *
 * @param {Options} options
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
	if (typeof children !== 'string') return children;

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
				...ui.$('TextHighlight'),
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
				...ui.$('Text'),
				children: text,
				className: unhighlightClassName,
				key: index,
				style: unhighlightStyle,
			});
		}
	});

	return textContent;
}
