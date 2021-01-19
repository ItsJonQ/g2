import { useContextSystem } from '@wp-g2/context';
import { noop } from 'lodash';

import { useUnitInputState } from './useUnitInputState';

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
export function useUnitInput(props) {
	const {
		arrows = false,
		allowEmptyValue = false,
		cssProp,
		fallbackUnit = 'px',
		incrementFromNonNumericValue = true,
		onChange = noop,
		value,
		...otherProps
	} = useContextSystem(props, 'UnitInput');

	const unitState = useUnitInputState({
		allowEmptyValue,
		cssProp,
		fallbackUnit,
		incrementFromNonNumericValue,
		onChange,
		value,
	});

	return {
		...otherProps,
		...unitState,
		arrows,
	};
}
