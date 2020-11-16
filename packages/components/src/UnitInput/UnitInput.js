import { contextConnect } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import { shallowCompare } from '@wp-g2/substate';
import React from 'react';

import { TextInput } from '../TextInput';
import UnitInputSelect from './UnitInputSelect';
import { useUnitInput } from './useUnitInput';

export function UnitInput(props, ref) {
	const {
		disabled,
		onSelectChange,
		unitStore,
		...unitInputProps
	} = useUnitInput(props, ref);
	const [value, unit] = unitStore(
		(state) => [state.parsedValue, state.unit],
		shallowCompare,
	);

	const suffix = (
		<UnitInputSelect
			disabled={disabled}
			onSelectChange={onSelectChange}
			unit={unit}
		/>
	);

	return (
		<TextInput
			{...unitInputProps}
			{...ui.$('UnitInput')}
			disabled={disabled}
			format="number"
			suffix={suffix}
			type="text"
			value={value}
		/>
	);
}

export default contextConnect(UnitInput, 'UnitInput');
