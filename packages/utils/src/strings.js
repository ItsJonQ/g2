/**
 * Repeats a character x amount of times.
 * @param {string} char Character to repeat.
 * @param {number} n Number of times to repeat.
 * @return {string} String with repeated characters
 */
export function repeat(char, n, a) {
	return (a = []).join((a[n - 1] = char));
}
