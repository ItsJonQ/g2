import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React, { useMemo } from 'react';

import { Flex } from '../Flex';
import * as styles from './card-styles';

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

export default contextConnect(CardFooter, 'CardFooter');
