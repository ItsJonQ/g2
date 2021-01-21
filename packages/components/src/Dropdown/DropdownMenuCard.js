import {
	contextConnect,
	ContextSystemProvider,
	useContextSystem,
} from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { Card } from '../Card';
import { Scrollable } from '../Scrollable';
import * as styles from './Dropdown.styles';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('../Card/types').CardProps, 'div'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
function DropdownMenuCard(props, forwardedRef) {
	const {
		children,
		className,
		elevation = 3,
		...otherProps
	} = useContextSystem(props, 'DropdownMenuCard');

	const classes = cx(styles.Card, className);

	return (
		<Card
			className={classes}
			elevation={elevation}
			{...otherProps}
			ref={forwardedRef}
		>
			<Scrollable className={styles.Scrollable}>
				<ContextSystemProvider
					value={{ MenuItem: { isOffset: false } }}
				>
					{children}
				</ContextSystemProvider>
			</Scrollable>
		</Card>
	);
}

export default contextConnect(DropdownMenuCard, 'DropdownMenuCard');
