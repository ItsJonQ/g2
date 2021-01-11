import { useSubState } from '@wp-g2/substate';
import {
	createUnitValue,
	is,
	isValidCSSValueForProp,
	mergeRefs,
	noop,
	parseUnitValue,
	useUpdateEffect,
} from '@wp-g2/utils';
import React from 'react';

import {
	findUnitMatchExact,
	getInitialParsedUnitValue,
	isPotentialUnitValue,
} from './UnitInput.utils';

/**
 * @typedef UnitStore
 * @property {string} [cssProp]
 * @property {string} value
 * @property {string | number} [parsedValue]
 * @property {string} [unit]
 * @property {import('react').Ref<HTMLInputElement | undefined>} inputRef
 *
 * @property {(value?: string) => void} commit
 * @property {(unit: string) => void} changeUnit
 * @property {(value: string) => void} sync
 * @property {(value: string) => boolean} validate
 *
 * @property {(value: string) => boolean} getIsValidCSSValue
 */

/** @typedef {import('@wp-g2/substate').UseStore<UnitStore>} UnitInputState */

/**
 * @typedef OwnProps
 * @property {import('../TextInput/types').TextInputArrow} [arrows] Renders specified incrementer/decrementer arrows.
 * @property {boolean} [allowEmptyValue] Allow for values to be an empty string.
 * @property {string} [cssProp] A CSS property name used to validate the (unit) value.
 * @property {string} [fallbackUnit] Unit to use if `incrementFromNonNumericValue` is enabled.
 * @property {boolean} [incrementFromNonNumericValue] Enables incrementing/decrementing from non-numeric values, such as `auto`.
 * @property {string} value The unit value.
 * @property {(value: string) => void} [onChange]
 */

/** @typedef {import('../TextInput/types').Props & OwnProps} Props */

/**
 *
 * @param {import('@wp-g2/create-styles').ViewOwnProps<Props, 'input'>} props
 * @param {import('react').Ref<any>} ref
 */
export function useUnitInput(props, ref) {
	const {
		arrows = false,
		allowEmptyValue = false,
		cssProp,
		fallbackUnit = 'px',
		incrementFromNonNumericValue = true,
		onChange = noop,
		value,
	} = props;
	const [parsedValue, unit] = getInitialParsedUnitValue({ cssProp, value });
	const inputRef = React.useRef();

	/** @type {UnitInputState} */
	const unitStore = useSubState((set, get) => ({
		cssProp,
		value,
		parsedValue,
		unit,
		inputRef,

		// Actions
		commit: (next = get().value) => {
			set((prev) => {
				const { getIsValidCSSValue } = prev;
				const [parsedValue, unit] = parseUnitValue(next);
				const nextState = { parsedValue };

				/**
				 * Handle cases that allow for empty values.
				 */
				if (allowEmptyValue && is.empty(next)) {
					return {
						parsedValue: '',
					};
				}

				if (unit) {
					nextState.unit = findUnitMatchExact({ value: unit });
				}

				/**
				 * Accounts for text values. e.g. `auto`.
				 */
				if (is.empty(parsedValue)) {
					nextState.parsedValue = getIsValidCSSValue(next)
						? is.numeric(parsedValue)
							? parsedValue
							: next
						: parsedValue;
				}

				return nextState;
			});
		},

		changeUnit: (nextUnit) => {
			const unit = findUnitMatchExact({ value: nextUnit });
			if (!unit) return;

			set({ unit });
			get().commit();
		},

		sync: (next) => set({ value: next }),

		validate: (next) => {
			if (next === get().value) return false;
			/**
			 * Handle cases that allow for empty values.
			 */
			if (allowEmptyValue && is.empty(next)) {
				return true;
			}

			const { cssProp, getIsValidCSSValue, unit } = get();
			if (!cssProp) return true;

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

		// Selectors
		getIsValidCSSValue: (next) => {
			const { cssProp } = get();
			if (!cssProp) return true;

			return isValidCSSValueForProp(cssProp, next);
		},
	}));

	const handleOnCommit = React.useCallback(
		(next) => {
			let nextValue = next;

			if (is.numeric(nextValue)) {
				const currentUnit = unitStore.getState().unit || fallbackUnit;
				nextValue = createUnitValue(next, currentUnit);
			}

			unitStore.getState().commit(nextValue);
			onChange(nextValue);
		},
		[fallbackUnit, onChange, unitStore],
	);

	const handleOnChange = React.useCallback(
		(next) => {
			unitStore.setState({ parsedValue: next });
		},
		[unitStore],
	);

	const handleOnSelectChange = React.useCallback(
		(next) => {
			const { parsedValue } = unitStore.getState();

			if (!parsedValue) return;

			const final = createUnitValue(parsedValue, next);

			handleOnCommit(final);
		},
		[handleOnCommit, unitStore],
	);

	useUpdateEffect(() => {
		unitStore.getState().commit(value);
		unitStore.getState().sync(value);
	}, [value]);

	return {
		...props,
		unitStore,
		arrows,
		incrementFromNonNumericValue,
		validate: unitStore.getState().validate,
		onChange: handleOnCommit,
		onValueChange: handleOnChange,
		onSelectChange: handleOnSelectChange,
		ref: mergeRefs([inputRef, ref]),
	};
}
