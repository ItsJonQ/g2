import { MenuButton } from '@wp-g2/a11y';
import { connect } from '@wp-g2/context';
import React from 'react';

import { Button } from '../Button';
import { useDropdownContext } from './Dropdown.Context';

function DropdownTrigger({ forwardedRef, ...props }) {
	const { menu } = useDropdownContext();
	const componentProps = {
		hasCaret: true,
		...props,
		ref: forwardedRef,
	};

	if (!menu) {
		return <Button {...componentProps} />;
	}

	return <MenuButton as={Button} {...componentProps} {...menu} />;
}

export default connect(DropdownTrigger, 'DropdownTrigger');
