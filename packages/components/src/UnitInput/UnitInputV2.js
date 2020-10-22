import { shallowCompare, useSubState } from '@wp-g2/substate';
import {
	createUnitValue,
	is,
	isValidCSSValueForProp,
	noop,
	parseUnitValue,
	useUpdateEffect,
} from '@wp-g2/utils';
import React from 'react';

import { TextInput } from '../TextInput';
const UNITS = ['px', '%', 'em', 'rem', 'vh', 'vw', 'vmin', 'vmax'];

function findUnitMatchExact({ units = UNITS, value = '' }) {
	const match = units.find(
		(unit) => unit.toLowerCase() === value.toLowerCase(),
	);
	return match;
}

const isPotentialUnitValue = (value) => {
	return is.numeric(value) && Number(value) !== 0;
};

function useUnitInput(props) {
	const { cssProp, hideArrows = true, onChange = noop, value } = props;
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
			unitStore.getState().commit(next);

			onChange(next);
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
			unitStore.setState({ unit: next });
			const final = createUnitValue(
				unitStore.getState().parsedValue,
				next,
			);
			onChange(final);
		},
		[onChange, unitStore],
	);

	useUpdateEffect(() => {
		unitStore.getState().commit(value);
		unitStore.getState().sync(value);
	}, [value]);

	return {
		...props,
		unitStore,
		hideArrows,
		validate: unitStore.getState().validate,
		onChange: handleOnCommit,
		onValueChange: handleOnChange,
		onSelectChange: handleOnSelectChange,
		ref: inputRef,
	};
}

export function UnitInput(props) {
	const { onSelectChange, unitStore, ...unitInputProps } = useUnitInput(
		props,
	);
	const [value, unit] = unitStore(
		(state) => [state.parsedValue, state.unit],
		shallowCompare,
	);

	const suffix = unit ? (
		<select
			autoFocus={false}
			onChange={(e) => onSelectChange(e.target.value)}
			onClick={(e) => e.stopPropagation()}
			onMouseDown={(e) => e.stopPropagation()}
			style={{ width: 40 }}
			title="Change unit"
			value={unit}
		>
			{UNITS.map((i) => (
				<option key={i} value={i}>
					{i}
				</option>
			))}
		</select>
	) : null;

	return (
		<TextInput
			{...unitInputProps}
			format="number"
			suffix={suffix}
			value={value}
		/>
	);
}

export default React.memo(UnitInput);
