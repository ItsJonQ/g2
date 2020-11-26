import { contextConnect } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import { shallowCompare } from '@wp-g2/substate';
import React from 'react';

import { TextInput } from '../TextInput';
import UnitInputSelect from './UnitInputSelect';
import { useUnitInput } from './useUnitInput';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('./useUnitInput').Props, 'input'>} props
 * @param {import('react').Ref<any>} ref
 */
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

/**
 * `UnitInput` is a form component that users can enter (CSS) unit values into.
 *
 * @example
 * ```jsx
 * import { UnitInput } from `@wp-g2/components`
 *
 * function Example() {
 *   return <UnitInput value="50%" min={0} max={100} />
 * }
 * ```
 *
 * @type {import('@wp-g2/create-styles').PolymorphicComponent<'input', import('./useUnitInput').Props>}
 */
const ConnectedUnitInput = contextConnect(UnitInput, 'UnitInput');

export default ConnectedUnitInput;
