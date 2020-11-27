import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, cx } from '@wp-g2/styles';
import React from 'react';

import { Menu } from '../Menu';
import { useDropdownContext } from './Dropdown.Context';
import * as styles from './Dropdown.styles';
import DropdownMenuCard from './DropdownMenuCard';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('./types').DropdownMenuProps, 'div'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
function DropdownMenu(props, forwardedRef) {
	const {
		children,
		className,
		elevation = 3,
		hideOnClickOutside = true,
		maxWidth,
		minWidth = 200,
		...otherProps
	} = useContextSystem(props, 'DropdownMenu');

	const { label, menu } = useDropdownContext();

	const classes = cx(
		styles.DropdownMenu,
		css({ maxWidth, minWidth }),
		className,
	);

	return (
		<Menu
			aria-label={label}
			{...otherProps}
			className={classes}
			hideOnClickOutside={hideOnClickOutside}
			menu={menu}
			ref={forwardedRef}
		>
			{(menu?.visible || menu?.animating) && (
				<DropdownMenuCard elevation={elevation}>
					{children}
				</DropdownMenuCard>
			)}
		</Menu>
	);
}

/**
 * `DropdownMenu` is an actionable component that contains actions (`DropdownMenuItem`) within a `Dropdown`.
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
 * @see https://reakit.io/docs/menu/#menu
 */
const ConnectedDropdownMenu = contextConnect(DropdownMenu, 'DropdownMenu');

export default ConnectedDropdownMenu;
