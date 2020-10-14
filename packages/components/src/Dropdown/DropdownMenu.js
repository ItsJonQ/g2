import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, cx } from '@wp-g2/styles';
import React from 'react';

import { Card } from '../Card';
import { Menu } from '../Menu';
import { Scrollable } from '../Scrollable';
import { useDropdownContext } from './Dropdown.Context';
import * as styles from './Dropdown.styles';

function DropdownMenu(props, forwardedRef) {
	const {
		children,
		className,
		elevation = 3,
		hideOnClickOutside = true,
		maxWidth,
		minWidth = 200,
		...otherProps
	} = useContextSystem(props, 'DropdownMenu');

	const { label, menu } = useDropdownContext();

	const classes = cx(
		styles.DropdownMenu,
		css({ maxWidth, minWidth }),
		className,
	);

	return (
		<Menu
			aria-label={label}
			{...otherProps}
			className={classes}
			hideOnClickOutside={hideOnClickOutside}
			menu={menu}
			ref={forwardedRef}
		>
			{(menu?.visible || menu?.animating) && (
				<DropdownMenuCard elevation={elevation}>
					{children}
				</DropdownMenuCard>
			)}
		</Menu>
	);
}

const DropdownMenuCard = React.memo(({ children, elevation }) => {
	return (
		<Card className={styles.Card} elevation={elevation}>
			<Scrollable className={styles.Scrollable}>{children}</Scrollable>
		</Card>
	);
});

export default contextConnect(DropdownMenu, 'DropdownMenu');
