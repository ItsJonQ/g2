import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { Card } from '../Card';
import { Scrollable } from '../Scrollable';
import * as styles from './Dropdown.styles';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('../Card/types').CardProps, 'div'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
function DropdownMenuCard(props, forwardedRef) {
	const { children, elevation = 3, ...otherProps } = useContextSystem(
		props,
		'DropdownMenuCard',
	);

	return (
		<Card
			className={styles.Card}
			elevation={elevation}
			{...otherProps}
			ref={forwardedRef}
		>
			<Scrollable className={styles.Scrollable}>{children}</Scrollable>
		</Card>
	);
}

export default contextConnect(DropdownMenuCard, 'DropdownMenuCard');
