import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { MenuHeader } from '../Menu';

function DropdownMenuHeader(props, forwardedRef) {
	const { ...otherProps } = useContextSystem(props, 'DropdownMenuHeader');

	return <MenuHeader {...otherProps} ref={forwardedRef} />;
}

export default contextConnect(DropdownMenuHeader, 'DropdownMenuHeader');
