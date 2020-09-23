import { color } from '../presets/colors';

describe('color', () => {
	test('should create a color value', () => {
		expect(color('red').toHexString()).toBe('#ff0000');
	});

	test('should return yellow color values', () => {
		expect(color.yellow).toBeTruthy();
		expect(color.yellow100).toBeTruthy();
		expect(color.yellow300).toBeTruthy();
		expect(color.yellow500).toBeTruthy();
		expect(color.yellow700).toBeTruthy();
		expect(color.yellow900).toBeTruthy();
	});
});
