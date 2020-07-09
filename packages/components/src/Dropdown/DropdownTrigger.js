import { connect } from '@wp-g2/provider';
import React from 'react';
import { MenuButton } from 'reakit/Menu';

import { Button } from '../Button';
import { useDropdownContext } from './Dropdown.utils';

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
