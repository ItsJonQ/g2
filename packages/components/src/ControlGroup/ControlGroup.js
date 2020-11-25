import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { Flex } from '../Flex';
import { Grid } from '../Grid';
import { useControlGroup } from './useControlGroup';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('./types').Props, 'div'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
function ControlGroup(props, forwardedRef) {
	const {
		children,
		direction = 'row',
		templateColumns,
		...otherProps
	} = useControlGroup(props);

	const isGrid = !!templateColumns;

	if (isGrid) {
		return (
			<Grid
				gap={0}
				templateColumns={templateColumns}
				{...otherProps}
				ref={forwardedRef}
			>
				{children}
			</Grid>
		);
	}

	return (
		<Flex
			direction={direction}
			gap={`-1px`}
			{...otherProps}
			ref={forwardedRef}
		>
			{children}
		</Flex>
	);
}

/**
 * `ControlGroup` is a layout component that contains control elements (e.g. `TextInput` or `Select`).
 *
 * @example
 * ```jsx
 * import { Button, ControlGroup, TextInput } from `@wp-g2/components`
 * import { ui } from `@wp-g2/styles`
 *
 * function Example() {
 *   return (
 *     <ControlGroup>
 *       <TextInput placeholder="First name" />
 *       <Button variant="primary" />
 *     </ControlGroup>
 *   );
 * }
 * ```
 *
 * @type {import('@wp-g2/create-styles').PolymorphicComponent<'div', import('./types').Props>}
 */
const ConnectedControlGroup = contextConnect(ControlGroup, 'ControlGroup');

export default ConnectedControlGroup;
