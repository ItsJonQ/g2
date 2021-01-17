import { contextConnect } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import React from 'react';

import { TextInput } from '../TextInput';
import UnitInputSelect from './UnitInputSelect';
import { useUnitInput } from './useUnitInput';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('./useUnitInput').Props, 'input'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
export function UnitInput(props, forwardedRef) {
	const {
		disabled,
		onSelectChange,
		unit,
		value,
		...otherProps
	} = useUnitInput(props);

	const suffix = unit && (
		<UnitInputSelect
			disabled={disabled}
			onSelectChange={onSelectChange}
			unit={unit}
		/>
	);

	return (
		<TextInput
			{...otherProps}
			{...ui.$('UnitInput')}
			disabled={disabled}
			format="number"
			ref={forwardedRef}
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
 */
const ConnectedUnitInput = contextConnect(UnitInput, 'UnitInput');

export default ConnectedUnitInput;
