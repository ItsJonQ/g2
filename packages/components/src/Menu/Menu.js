import { Menu as ReakitMenu } from '@wp-g2/a11y';
import { connect } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { useDropdownContext } from '../Dropdown';
import { View } from '../View';
import { MenuContext } from './Menu.Context';
import * as styles from './Menu.styles';

function Menu({ children, className, forwardedRef, ...props }) {
	const { menu } = useDropdownContext();
	const contextProps = {
		menu,
	};

	const classes = cx([styles.Menu, className]);
	const menuProps = menu || {};
	const Component = menu ? ReakitMenu : View;

	return (
		<MenuContext.Provider value={contextProps}>
			<Component
				hideOnClickOutside={false}
				{...menuProps}
				{...props}
				className={classes}
				ref={forwardedRef}
			>
				{children}
			</Component>
		</MenuContext.Provider>
	);
}

export default connect(Menu, 'Menu');
