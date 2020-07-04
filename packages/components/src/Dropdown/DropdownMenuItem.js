import { connect } from '@g2/provider';
import React from 'react';

import { useDropdownContext } from './Dropdown.utils';
import { DropdownMenuItemView } from './DropdownMenuItem.styles';

function DropdownMenuItem({ forwardedRef, ...props }) {
	const { menu } = useDropdownContext();
	return <DropdownMenuItemView {...props} {...menu} ref={forwardedRef} />;
}

export default connect(DropdownMenuItem);
