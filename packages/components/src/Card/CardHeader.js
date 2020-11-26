import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React, { useMemo } from 'react';

import { Flex } from '../Flex';
import * as styles from './Card.styles';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('./types').CardHeaderProps, 'div'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
function CardHeader(props, forwardedRef) {
	const { className, size = 'medium', ...otherProps } = useContextSystem(
		props,
		'CardHeader',
	);

	const classes = useMemo(
		() =>
			cx(
				styles.Header,
				styles.borderRadius,
				styles.headerFooter,
				styles[size],
				className,
			),
		[className, size],
	);

	return <Flex {...otherProps} className={classes} ref={forwardedRef} />;
}

/**
 * `CardHeader` is a layout component, rendering the header contents of a `Card`.
 *
 * @example
 * ```jsx
 * <Card>
 * 	<CardHeader>...</CardHeader>
 * 	<CardBody>...</CardBody>
 * </Card>
 * ```
 *
 * @type {import('@wp-g2/create-styles').PolymorphicComponent<'div', import('./types').CardHeaderProps>}
 */
const ConnectedCardHeader = contextConnect(CardHeader, 'CardHeader');

export default ConnectedCardHeader;
