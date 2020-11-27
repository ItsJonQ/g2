import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';
import { Menu as ReakitMenu, useMenuState } from 'reakit';

import { useDropdownContext } from '../Dropdown';
import { usePopoverResizeUpdater } from '../Popover/Popover.utils';
import { View } from '../View';
import { MenuContext } from './Menu.Context';
import * as styles from './Menu.styles';

/**
 * `Menu` is an actionable component that displays a list of actions, links, or informative content.
 *
 * @example
 * ```jsx
 * <Menu>
 *  <MenuItem>...</MenuItem>
 *  <MenuItem>...</MenuItem>
 *  <MenuItem>...</MenuItem>
 * </Menu>
 * ```
 *
 * @see https://reakit.io/docs/menu/#menu
 *
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('./types').Props, 'div'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
function Menu(props, forwardedRef) {
	const { children, className, menu, ...otherProps } = useContextSystem(
		props,
		'Menu',
	);

	const resizeListener = usePopoverResizeUpdater({
		onResize: menu?.unstable_update,
	});

	const contextProps = {
		menu,
	};

	const classes = cx(styles.Menu, className);
	const menuProps = menu || {};
	const Component = menu ? ReakitMenu : View;

	return (
		<MenuContext.Provider value={contextProps}>
			<Component
				hideOnClickOutside={false}
				{...menuProps}
				{...otherProps}
				className={classes}
				ref={forwardedRef}
			>
				{resizeListener}
				{children}
			</Component>
		</MenuContext.Provider>
	);
}

/**
 * `Menu` is an actionable component that displays a list of actions, links, or informative content.
 *
 * @example
 * ```jsx
 * <Menu>
 *  <MenuItem>...</MenuItem>
 *  <MenuItem>...</MenuItem>
 *  <MenuItem>...</MenuItem>
 * </Menu>
 * ```
 *
 * @see https://reakit.io/docs/menu/#menu
 */
const ConnectedMenu = contextConnect(Menu, 'Menu');

export default ConnectedMenu;
