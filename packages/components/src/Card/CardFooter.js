import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React, { useMemo } from 'react';

import { Flex } from '../Flex';
import * as styles from './Card.styles';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('./types').CardFooterProps, 'div'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
function CardFooter(props, forwardedRef) {
	const {
		className,
		justify = 'flex-end',
		size = 'medium',
		...otherProps
	} = useContextSystem(props, 'CardFooter');

	const classes = useMemo(
		() =>
			cx(
				styles.borderRadius,
				styles.headerFooter,
				styles[size],
				className,
			),
		[className, size],
	);

	return (
		<Flex
			{...otherProps}
			className={classes}
			justify={justify}
			ref={forwardedRef}
		/>
	);
}

/**
 * `CardFooter` is a layout component, rendering the footer content of a `Card`.
 *
 * @example
 * ```jsx
 * <Card>
 * 	<CardBody>...</CardBody>
 * 	<CardFooter>...</CardFooter>
 * </Card>
 * ```
 *
 * @type {import('@wp-g2/create-styles').PolymorphicComponent<'div', import('./types').CardFooterProps>}
 */
const ConnectedCardFooter = contextConnect(CardFooter, 'CardFooter');

export default ConnectedCardFooter;
