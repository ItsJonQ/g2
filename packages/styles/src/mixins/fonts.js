import { get } from '../core';

export const BASE_FONT_SIZE = 13;

export function getFontSize(size = BASE_FONT_SIZE) {
	const ratio = size / BASE_FONT_SIZE;
	return `calc(${ratio} * ${get('fontSize')})`;
}
