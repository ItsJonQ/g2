import { is } from './is';

export function mergeValidationFunctions(validate, extraValidate) {
	if (!is.function(validate)) return;
	if (!is.function(extraValidate)) return validate;

	return (...args) => {
		return validate(...args) || extraValidate(...args);
	};
}
