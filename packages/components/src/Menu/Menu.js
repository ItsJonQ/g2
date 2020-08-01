import { connect } from '@wp-g2/provider';
import { cx } from '@wp-g2/styles';
import React from 'react';
import { Menu as ReakitMenu, useMenuState } from 'reakit/Menu';

import * as styles from './Menu.styles';
import { MenuContext } from './Menu.utils';

function Menu({ children, className, forwardedRef, menu: menuProp, ...props }) {
	const baseMenuState = useMenuState({ visible: true });
	const menu = menuProp || baseMenuState;
	const contextValue = {
		menu,
	};

	const classes = cx([styles.Menu, className]);

	return (
		<MenuContext.Provider value={contextValue}>
			<ReakitMenu
				hideOnClickOutside={false}
				{...menu}
				{...props}
				className={classes}
				ref={forwardedRef}
			>
				{children}
			</ReakitMenu>
		</MenuContext.Provider>
	);
}

export default connect(Menu);
