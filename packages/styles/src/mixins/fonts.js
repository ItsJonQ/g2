import { is } from '@wp-g2/utils';

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

/**
 *
 * @param {number | 'body' | 'caption' | 'footnote' | 'largeTitle' | 'subheadline' | 'title'} size
 * @return {string}
 */
export function getFontSize(size = BASE_FONT_SIZE) {
	if (PRESET_FONT_SIZES[size]) {
		return getFontSize(PRESET_FONT_SIZES[size]);
	}

	if (!is.number(size)) return size;

	const ratio = size / BASE_FONT_SIZE;
	return `calc(${ratio} * ${get('fontSize')})`;
}
