import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';
import { MenuButton } from 'reakit';

import { Button } from '../Button';
import { useDropdownContext } from './Dropdown.Context';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('../Button/Button').Props, 'button'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
function DropdownTrigger(props, forwardedRef) {
	const { hasCaret = false, ...otherProps } = useContextSystem(
		props,
		'DropdownTrigger',
	);
	const { menu } = useDropdownContext();

	const componentProps = {
		hasCaret,
		...otherProps,
		ref: forwardedRef,
	};

	if (!menu) {
		return <Button {...componentProps} />;
	}

	return <MenuButton as={Button} {...componentProps} {...menu} />;
}

/**
 * `DropdownTrigger` is an actionable component that toggles the visibility of a `Dropdown`.
 *
 * @example
 * ```jsx
 * <Dropdown>
 *  <DropdownTrigger>Edit</DropdownTrigger>
 *  <DropdownMenu>
 *    ...
 *  </DropdownMenu>
 * </Dropdown>
 * ```
 */
const ConnectedDropdownTrigger = contextConnect(
	DropdownTrigger,
	'DropdownTrigger',
);

export default ConnectedDropdownTrigger;
