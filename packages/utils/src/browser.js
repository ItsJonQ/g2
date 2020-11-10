/**
 * @param {string} browser
 * @return {boolean}
 */
export function detectBrowser(browser) {
	return navigator.userAgent.toLowerCase().indexOf(browser) > -1;
}

/**
 * @return {boolean}
 */
export function isChrome() {
	return detectBrowser('chrome');
}

/**
 * @return {boolean}
 */
export function isFirefox() {
	return detectBrowser('firefox');
}

/**
 * @return {boolean}
 */
export function isSafari() {
	return detectBrowser('safari');
}
