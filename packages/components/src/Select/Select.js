import { contextConnect } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import { mergeRefs } from '@wp-g2/utils';
import React from 'react';

import { FlexItem } from '../Flex';
import { View } from '../View';
import SelectArrow from './SelectArrow';
import { useSelect } from './useSelect';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('./types').Props, 'select'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
function Select(props, forwardedRef) {
	const {
		as = 'select',
		inputProps,
		inputRef,
		multiple,
		prefix,
		resizer,
		sizes,
		suffix,
		suffixProps,
		...otherProps
	} = useSelect(props);

	return (
		<View {...otherProps}>
			{prefix && <FlexItem {...ui.$('SelectPrefix')}>{prefix}</FlexItem>}
			<View
				as={as}
				{...inputProps}
				ref={mergeRefs([forwardedRef, inputRef])}
			/>
			{suffix && (
				<FlexItem {...ui.$('SelectSuffix')} {...suffixProps}>
					{resizer}
					{suffix}
				</FlexItem>
			)}
			{!multiple && <SelectArrow />}
		</View>
	);
}

/**
 * `Select` is a form component lets users choose options from an options menu.
 *
 * @example
 * ```jsx
 * import { Select } from `@wp-g2/components`
 *
 * function Example() {
 *   return (
 *     <Select>
 *       <option>Ana</option>
 *       <option>Elsa</option>
 *       <option>Kristoff</option>
 *       <option>Olaf</option>
 *     </Select>
 *   );
 * }
 * ```
 */
const ConnectedSelect = contextConnect(Select, 'Select');

export default ConnectedSelect;
