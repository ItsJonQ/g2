/**
 * Creates an item ID based on a prefix ID and an alignment value.
 *
 * @param {string} prefixId An ID to prefix.
 * @param {string} value An alignment value.
 *
 * @return {string} The item id.
 */
export function getItemId(prefixId, value) {
	const valueId = value.replace(' ', '-');

	return `${prefixId}-${valueId}`;
}
