import { contextConnect, useContextSystem } from '@wp-g2/context';
import { noop } from 'lodash';
import React, { useCallback } from 'react';

import { MenuItem } from '../Menu';
import { useDropdownContext } from './Dropdown.Context';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('./types').DropdownMenuItemProps, 'div'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
function DropdownMenuItem(props, forwardedRef) {
	const { onClick = noop, ...otherProps } = useContextSystem(
		props,
		'DropdownMenuItem',
	);
	const { hideOnClickItem, menu } = useDropdownContext();

	const handleOnClick = useCallback(
		(...args) => {
			onClick(...args);

			if (hideOnClickItem) {
				menu.hide();
			}
		},
		[onClick, hideOnClickItem, menu],
	);

	return (
		<MenuItem
			{...otherProps}
			{...menu}
			onClick={handleOnClick}
			ref={forwardedRef}
		/>
	);
}

/**
 * `DropdownMenuItem` is an actionable component that renders within a `Dropdown`.
 *
 * @example
 * ```jsx
 * <Dropdown>
 *  <DropdownTrigger>Edit</DropdownTrigger>
 *  <DropdownMenu>
 *    <DropdownMenuItem>...</DropdownMenuItem>
 *    <DropdownMenuItem>...</DropdownMenuItem>
 *    <DropdownMenuItem>...</DropdownMenuItem>
 *  </DropdownMenu>
 * </Dropdown>
 * ```
 *
 * @see https://reakit.io/docs/menu/#menuitem
 */
const ConnectedDropdownMenuItem = contextConnect(
	DropdownMenuItem,
	'DropdownMenuItem',
);

export default ConnectedDropdownMenuItem;
