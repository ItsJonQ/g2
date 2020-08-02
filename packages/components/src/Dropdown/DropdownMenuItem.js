import { connect } from '@wp-g2/provider';
import React from 'react';

import { MenuItem } from '../Menu';
import { useDropdownContext } from './Dropdown.Context';

function DropdownMenuItem({ forwardedRef, ...props }) {
	const { menu } = useDropdownContext();
	return <MenuItem {...props} {...menu} ref={forwardedRef} />;
}

export default connect(DropdownMenuItem);
