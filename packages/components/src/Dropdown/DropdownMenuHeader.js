import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { MenuHeader } from '../Menu';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('../Menu/MenuHeader').Props, 'div'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
function DropdownMenuHeader(props, forwardedRef) {
	const { ...otherProps } = useContextSystem(props, 'DropdownMenuHeader');

	return <MenuHeader {...otherProps} ref={forwardedRef} />;
}

export default contextConnect(DropdownMenuHeader, 'DropdownMenuHeader');
