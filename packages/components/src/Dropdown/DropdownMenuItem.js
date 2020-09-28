import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { MenuItem } from '../Menu';
import { useDropdownContext } from './Dropdown.Context';

function DropdownMenuItem(props, forwardedRef) {
	const { ...otherProps } = useContextSystem(props, 'DropdownMenuItem');
	const { menu } = useDropdownContext();

	return <MenuItem {...otherProps} {...menu} ref={forwardedRef} />;
}

export default contextConnect(DropdownMenuItem, 'DropdownMenuItem');
