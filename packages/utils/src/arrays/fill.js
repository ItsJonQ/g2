/**
 * @param {number} amount
 * @return {number[]}
 */
export function prefill(amount = 0) {
	return Array.from(Array(amount).keys());
}
