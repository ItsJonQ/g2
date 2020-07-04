import { connect } from '@g2/provider';
import React from 'react';
import { Menu } from 'reakit/Menu';

import { Card } from '../Card';
import { Scrollable } from '../Scrollable';
import { useDropdownContext } from './Dropdown.utils';
import { DropdownMenuView } from './DropdownMenu.styles';

function DropdownMenu({
	children,
	elevation = 3,
	forwardedRef,
	minWidth = 200,
	...props
}) {
	const { label, menu } = useDropdownContext();
	return (
		<Menu
			aria-label={label}
			{...props}
			{...menu}
			__sx={{ minWidth }}
			as={DropdownMenuView}
			ref={forwardedRef}
		>
			<Card
				elevation={elevation}
				sx={{ maxHeight: '50vh', minHeight: 24 }}
			>
				<Scrollable sx={{ maxHeight: '50vh', px: 1, py: 1 }}>
					{children}
				</Scrollable>
			</Card>
		</Menu>
	);
}

export default connect(DropdownMenu);
