import { get } from '../../core';
import {
	BASE_FONT_SIZE,
	getFontSize,
	getHeadingFontSize,
	PRESET_FONT_SIZES,
} from '../fonts';

describe('getFontSize', () => {
	it('should use the preset font size', () => {
		expect(getFontSize('title')).toEqual(
			getFontSize(PRESET_FONT_SIZES.title),
		);
	});

	it('should accept a string number', () => {
		expect(getFontSize('1.5')).toEqual(
			`calc((1.5 / ${BASE_FONT_SIZE}) * ${get('fontSize')})`,
		);
	});

	it('should accept a number', () => {
		expect(getFontSize(1.5)).toEqual(
			`calc((1.5 / ${BASE_FONT_SIZE}) * ${get('fontSize')})`,
		);
	});

	it('should return valid css values if they are not number like', () => {
		expect(getFontSize('initial')).toEqual('initial');
	});
});

describe('getHeadingFontSize', () => {
	it('should return the heading size', () => {
		expect(getHeadingFontSize(1)).toEqual(get('fontSizeH1'));
	});

	it('should accept the heading size as a string', () => {
		expect(getHeadingFontSize('5')).toEqual(get('fontSizeH5'));
	});

	it('should return valid css values', () => {
		expect(getHeadingFontSize('initial')).toEqual('initial');
	});

	it('should return a font size if the passed in value does not correspond to a heading size', () => {
		expect(getHeadingFontSize('1.4')).toEqual(getFontSize('1.4'));
	});
});
