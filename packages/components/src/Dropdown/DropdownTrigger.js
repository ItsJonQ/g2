import { MenuButton } from '@wp-g2/a11y';
import { connect } from '@wp-g2/provider';
import React from 'react';

import { Button } from '../Button';
import { useDropdownContext } from './Dropdown.Context';

function DropdownTrigger({ forwardedRef, ...props }) {
	const { menu } = useDropdownContext();
	return (
		<MenuButton
			as={Button}
			hasCaret
			{...props}
			{...menu}
			ref={forwardedRef}
		/>
	);
}

export default connect(DropdownTrigger);
