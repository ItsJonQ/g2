import { connect } from '@wp-g2/provider';
import React from 'react';

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
		<DropdownMenuView
			aria-label={label}
			{...props}
			css={{ minWidth }}
			menu={menu}
			ref={forwardedRef}
		>
			<Card
				css={{ maxHeight: '50vh', minHeight: 24 }}
				elevation={elevation}
			>
				<Scrollable sx={{ maxHeight: '50vh', px: 1, py: 1 }}>
					{children}
				</Scrollable>
			</Card>
		</DropdownMenuView>
	);
}

export default connect(DropdownMenu);
