const matchers = require('@testing-library/jest-dom/matchers');

function clearStyleSystem() {
	const head = document.querySelector('head');
	const styles = Array.from(head.querySelectorAll('style[data-emotion]'));

	if (styles.length) {
		styles.forEach((style) => head.removeChild(style));
	}
}

beforeEach(() => {
	clearStyleSystem();
});

afterEach(() => {
	clearStyleSystem();
});

expect.extend({ ...matchers });
