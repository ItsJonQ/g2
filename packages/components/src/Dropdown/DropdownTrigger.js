import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';
import { MenuButton } from 'reakit';

import { Button } from '../button';
import { useDropdownContext } from './Dropdown.Context';

function DropdownTrigger(props, forwardedRef) {
	const { hasCaret = false, ...otherProps } = useContextSystem(
		props,
		'DropdownTrigger',
	);
	const { menu } = useDropdownContext();

	const componentProps = {
		hasCaret,
		...otherProps,
		ref: forwardedRef,
	};

	if (!menu) {
		return <Button {...componentProps} />;
	}

	return <MenuButton as={Button} {...componentProps} {...menu} />;
}

export default contextConnect(DropdownTrigger, 'DropdownTrigger');
