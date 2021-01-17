import { useControlledValue } from '@wp-g2/utils';
import { createUnitValue, is, isValidCSSValueForProp } from '@wp-g2/utils';
import React from 'react';

import {
	findUnitMatchExact,
	getInitialParsedUnitValue,
	isPotentialUnitValue,
} from './UnitInput.utils';

export function useUnitInputState({
	allowEmptyValue = false,
	cssProp,
	fallbackUnit = 'px',
	incrementFromNonNumericValue = true,
	onChange: onChangeProp,
	value: valueProp,
}) {
	const [controlledValue, onChange] = useControlledValue({
		value: valueProp,
		onChange: onChangeProp,
	});

	const value = controlledValue;
	const [parsedValue, parsedUnit] = getInitialParsedUnitValue({
		cssProp,
		value,
	});
	const unit = findUnitMatchExact({ value: parsedUnit }) || null;

	const getIsValidCSSValue = React.useCallback(
		(next) => {
			if (!cssProp) return true;
			return isValidCSSValueForProp(cssProp, next);
		},
		[cssProp],
	);

	const validate = React.useCallback(
		(next) => {
			if (next === value) return false;
			if (!cssProp) return true;

			/**
			 * Handle cases that allow for empty values.
			 */
			if (allowEmptyValue && is.empty(next)) {
				return true;
			}

			let validationValue = next;

			if (isPotentialUnitValue(validationValue)) {
				if (!unit && incrementFromNonNumericValue) {
					validationValue = createUnitValue(
						validationValue,
						fallbackUnit,
					);
				} else {
					validationValue = createUnitValue(validationValue, unit);
				}
			}

			return getIsValidCSSValue(validationValue);
		},
		[
			allowEmptyValue,
			cssProp,
			fallbackUnit,
			getIsValidCSSValue,
			incrementFromNonNumericValue,
			unit,
			value,
		],
	);

	const handleOnChange = React.useCallback(
		(next) => {
			let nextValue = next;

			if (is.numeric(nextValue)) {
				const currentUnit = unit || fallbackUnit;
				nextValue = createUnitValue(next, currentUnit);
			}

			if (allowEmptyValue && is.empty(next)) {
				nextValue = '';
			}

			if (!validate(nextValue)) return;

			onChange(nextValue);
		},
		[allowEmptyValue, fallbackUnit, onChange, unit, validate],
	);

	const handleOnSelectChange = React.useCallback(
		(next) => {
			if (!parsedValue) return;
			const final = createUnitValue(parsedValue, next);

			handleOnChange(final);
		},
		[handleOnChange, parsedValue],
	);

	return {
		value: parsedValue,
		onChange: handleOnChange,
		onSelectChange: handleOnSelectChange,
		validate,
		unit,
	};
}
