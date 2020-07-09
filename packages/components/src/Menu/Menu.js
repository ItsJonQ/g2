import { connect } from '@wp-g2/provider';
import React from 'react';
import { useMenuState } from 'reakit/Menu';

import { MenuView } from './Menu.styles';
import { MenuContext } from './Menu.utils';

function Menu({ children, forwardedRef, menu: menuProp, ...props }) {
	const baseMenuState = useMenuState({ visible: true });
	const menu = menuProp || baseMenuState;
	const contextValue = {
		menu,
	};

	return (
		<MenuContext.Provider value={contextValue}>
			<MenuView
				hideOnClickOutside={false}
				{...menu}
				{...props}
				ref={forwardedRef}
			>
				{children}
			</MenuView>
		</MenuContext.Provider>
	);
}

export default connect(Menu);
