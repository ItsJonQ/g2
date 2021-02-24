import { getRtl } from '../plugins/rtl';

describe('getRtl', () => {
	afterEach(() => {
		document.dir = '';
	});

	test('should return false when document has no dir setting', () => {
		expect(getRtl()).toBe(false);
	});

	test('should return false when document is ltr', () => {
		document.dir = 'ltr';
		expect(getRtl()).toBe(false);

		document.documentElement.setAttribute('dir', 'ltr');
		expect(getRtl()).toBe(false);
	});

	test('should return true when document is rtl', () => {
		document.dir = 'rtl';
		expect(getRtl()).toBe(true);

		document.documentElement.setAttribute('dir', 'rtl');
		expect(getRtl()).toBe(true);
	});
});
