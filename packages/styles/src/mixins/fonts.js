import { get } from '../core';

export const BASE_FONT_SIZE = 13;

const PRESET_FONT_SIZES = {
	body: 13,
	caption: 10,
	footnote: 11,
	largeTitle: 28,
	subheadline: 12,
	title: 20,
};

const HEADING_FONT_SIZES = [1, 2, 3, 4, 5, 6];

/**
 *
 * @param {import('react').CSSProperties['fontSize'] | 'body' | 'caption' | 'footnote' | 'largeTitle' | 'subheadline' | 'title'} size
 * @return {string}
 */
export function getFontSize(size = BASE_FONT_SIZE) {
	if (PRESET_FONT_SIZES[size]) {
		return getFontSize(PRESET_FONT_SIZES[size]);
	}

	if (typeof size !== 'number') return size;

	const ratio = /** @type {number} */ (size) / BASE_FONT_SIZE;
	return `calc(${ratio} * ${get('fontSize')})`;
}

export function getHeadingFontSize(size = 3) {
	if (!HEADING_FONT_SIZES.includes(size)) {
		return getFontSize(size);
	}

	const headingSize = `fontSizeH${size}`;
	/* @ts-ignore */
	return get(headingSize);
}
