import { contextConnect } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import { shallowCompare } from '@wp-g2/substate';
import React from 'react';

import { TextInput } from '../TextInput';
import UnitInputSelect from './UnitInputSelect';
import { useUnitInput } from './useUnitInput';

export function UnitInput(props, ref) {
	const { onSelectChange, unitStore, ...unitInputProps } = useUnitInput(
		props,
		ref,
	);
	const [value, unit] = unitStore(
		(state) => [state.parsedValue, state.unit],
		shallowCompare,
	);

	const suffix = (
		<UnitInputSelect onSelectChange={onSelectChange} unit={unit} />
	);

	return (
		<TextInput
			{...unitInputProps}
			{...ui.$('UnitInput')}
			format="number"
			suffix={suffix}
			type="text"
			value={value}
		/>
	);
}

export default contextConnect(UnitInput, 'UnitInput');
