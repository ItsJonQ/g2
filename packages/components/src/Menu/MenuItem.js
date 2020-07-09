import { connect } from '@wp-g2/provider';
import React from 'react';

import { useMenuContext } from './Menu.utils';
import { MenuItemView } from './MenuItem.styles';

function MenuItem({ forwardedRef, ...props }) {
	const { menu } = useMenuContext();
	return <MenuItemView {...props} {...menu} ref={forwardedRef} />;
}

export default connect(MenuItem);
