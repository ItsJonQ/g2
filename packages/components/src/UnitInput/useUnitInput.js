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

import { findUnitMatchExact, isPotentialUnitValue } from './UnitInput.utils';

export function useUnitInput(props, ref) {
	const { cssProp, arrows = false, onChange = noop, value } = props;
	const [parsedValue, unit] = parseUnitValue(value);
	const inputRef = React.useRef();

	const unitStore = useSubState((set) => ({
		cssProp,
		value,
		parsedValue,
		unit,
		inputRef,

		// Actions
		commit: (next) => {
			set((prev) => {
				const { getIsValidCSSValue } = prev;
				const [parsedValue, unit] = parseUnitValue(next);
				const nextState = { parsedValue };

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

		changeUnit: (next) => {
			const unit = findUnitMatchExact({ value: next });
			if (!unit) return;

			set({ unit });
			unitStore.getState().commit();
		},

		sync: (next) => set({ value: next }),

		validate: (next) => {
			if (next === unitStore.getState().value) return false;

			const { cssProp, getIsValidCSSValue, unit } = unitStore.getState();
			if (!cssProp) return true;

			let validationValue = next;

			if (isPotentialUnitValue(validationValue)) {
				validationValue = createUnitValue(validationValue, unit);
			}

			return getIsValidCSSValue(validationValue);
		},

		// Selectors
		getIsValidCSSValue: (next) => {
			const { cssProp } = unitStore.getState();
			if (!cssProp) return true;

			return isValidCSSValueForProp(cssProp, next);
		},
	}));

	const handleOnCommit = React.useCallback(
		(next) => {
			let nextValue = next;

			if (is.numeric(nextValue)) {
				const currentUnit = unitStore.getState().unit;
				nextValue = createUnitValue(next, currentUnit);
			}

			unitStore.getState().commit(nextValue);
			onChange(nextValue);
		},
		[onChange, unitStore],
	);

	const handleOnChange = React.useCallback(
		(next) => {
			unitStore.setState({ parsedValue: next });
		},
		[unitStore],
	);

	const handleOnSelectChange = React.useCallback(
		(next) => {
			const final = createUnitValue(
				unitStore.getState().parsedValue,
				next,
			);

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
		validate: unitStore.getState().validate,
		onChange: handleOnCommit,
		onValueChange: handleOnChange,
		onSelectChange: handleOnSelectChange,
		ref: mergeRefs([inputRef, ref]),
	};
}
