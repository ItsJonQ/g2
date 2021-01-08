/**
 * Merges validation functions together.
 *
 * @template {unknown[]} TArgs
 * @param {(...args: TArgs) => unknown} validate
 * @param {(...args: TArgs) => unknown} extraValidate
 *
 * @return {Function | undefined} A single merged validation function.
 */
export function mergeValidationFunctions(validate, extraValidate) {
	if (typeof validate !== 'function') return;
	if (typeof extraValidate !== 'function') return validate;

	return (/** @type {TArgs} */ ...args) => {
		return validate(...args) || extraValidate(...args);
	};
}
