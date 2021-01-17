import { useControlledValue } from '@wp-g2/utils';
import {
	createUnitValue,
	is,
	isValidCSSValueForProp,
	usePropRef,
} from '@wp-g2/utils';
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

	const propRefs = usePropRef({
		allowEmptyValue,
		fallbackUnit,
		cssProp,
		incrementFromNonNumericValue,
		value,
		parsedValue,
		unit,
	});

	const getIsValidCSSValue = React.useCallback(
		(next) => {
			const { cssProp } = propRefs.current;
			if (!cssProp) return true;

			return isValidCSSValueForProp(cssProp, next);
		},
		[propRefs],
	);

	const validate = React.useCallback(
		(next) => {
			const {
				allowEmptyValue,
				cssProp,
				fallbackUnit,
				incrementFromNonNumericValue,
				unit,
				value,
			} = propRefs.current;

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
		[getIsValidCSSValue, propRefs],
	);

	const handleOnChange = React.useCallback(
		(next) => {
			const { allowEmptyValue, fallbackUnit, unit } = propRefs.current;
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
		[onChange, propRefs, validate],
	);

	const handleOnSelectChange = React.useCallback(
		(next) => {
			const { parsedValue } = propRefs.current;
			if (!parsedValue) return;

			const final = createUnitValue(parsedValue, next);

			handleOnChange(final);
		},
		[handleOnChange, propRefs],
	);

	return {
		incrementFromNonNumericValue,
		value: parsedValue,
		onChange: handleOnChange,
		onSelectChange: handleOnSelectChange,
		validate,
		unit,
	};
}
