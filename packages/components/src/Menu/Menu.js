import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';
import { Menu as ReakitMenu } from 'reakit';

import { useDropdownContext } from '../Dropdown';
import { usePopoverResizeUpdater } from '../Popover/Popover.utils';
import { View } from '../View';
import { MenuContext } from './Menu.Context';
import * as styles from './Menu.styles';

function Menu(props, forwardedRef) {
	const {
		children,
		className,
		menu: menuProp,
		...otherProps
	} = useContextSystem(props, 'Menu');

	const { menu } = useDropdownContext();
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

export default contextConnect(Menu, 'Menu');
