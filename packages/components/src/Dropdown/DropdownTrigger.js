import { MenuButton } from '@wp-g2/a11y';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { Button } from '../Button';
import { useDropdownContext } from './Dropdown.Context';

function DropdownTrigger(props, forwardedRef) {
	const { ...otherProps } = useContextSystem(props, 'DropdownTrigger');
	const { menu } = useDropdownContext();

	const componentProps = {
		hasCaret: true,
		...otherProps,
		ref: forwardedRef,
	};

	if (!menu) {
		return <Button {...componentProps} />;
	}

	return <MenuButton as={Button} {...componentProps} {...menu} />;
}

export default contextConnect(DropdownTrigger, 'DropdownTrigger');
