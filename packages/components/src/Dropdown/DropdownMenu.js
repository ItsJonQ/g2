import { connect } from '@wp-g2/provider';
import { css, cx } from '@wp-g2/styles';
import React from 'react';

import { Card } from '../Card';
import { Menu } from '../Menu';
import { Scrollable } from '../Scrollable';
import * as styles from './Dropdown.styles';
import { useDropdownContext } from './Dropdown.utils';

function DropdownMenu({
	children,
	className,
	elevation = 3,
	forwardedRef,
	hideOnClickOutside = true,
	minWidth = 200,
	...props
}) {
	const { label, menu } = useDropdownContext();
	const classes = cx([styles.DropdownMenu, css({ minWidth }), className]);

	return (
		<Menu
			aria-label={label}
			{...props}
			className={classes}
			hideOnClickOutside={hideOnClickOutside}
			menu={menu}
			ref={forwardedRef}
		>
			<Card
				css={{ maxHeight: '50vh', minHeight: 24 }}
				elevation={elevation}
			>
				<Scrollable css={{ maxHeight: '50vh', padding: 4 }}>
					{children}
				</Scrollable>
			</Card>
		</Menu>
	);
}

export default connect(DropdownMenu);
