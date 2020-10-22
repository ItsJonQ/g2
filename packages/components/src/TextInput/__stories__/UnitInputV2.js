import { shallowCompare, useSubState } from '@wp-g2/substate';
import { noop, parseUnitValue, useUpdateEffect } from '@wp-g2/utils';
import React from 'react';

import TextInput from '../TextInput';

function useUnitInput(props) {
	const { onChange = noop, value } = props;
	const [parsedValue, unit] = parseUnitValue(value);
	const inputRef = React.useRef();

	const unitStore = useSubState((set) => ({
		value,
		parsedValue,
		unit,
		inputRef,

		// Actions
		commit: (next) => {
			set((prev) => {
				const [parsedValue, unit] = parseUnitValue(next);
				const nextState = { parsedValue };

				if (unit) {
					nextState.unit = unit;
				}

				return nextState;
			});
		},
		sync: (next) => set({ value: next }),
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

	const validate = React.useCallback(
		(next) => {
			if (next === unitStore.getState().value) return false;
			return true;
		},
		[unitStore],
	);

	useUpdateEffect(() => {
		unitStore.getState().commit(value);
		unitStore.getState().sync(value);
	}, [value]);

	return {
		...props,
		unitStore,
		validate,
		onChange: handleOnCommit,
		onValueChange: handleOnChange,
		ref: inputRef,
	};
}
export function UnitInput(props) {
	const { unitStore, ...unitInputProps } = useUnitInput(props);
	const [value, unit] = unitStore(
		(state) => [state.parsedValue, state.unit],
		shallowCompare,
	);

	const suffix = <span>{unit}</span>;

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
