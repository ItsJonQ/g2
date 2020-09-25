import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { Flex } from '../Flex';
import * as styles from './Card.styles';

function CardHeader(props, forwardedRef) {
	const { className, size = 'medium', ...otherProps } = useContextSystem(
		props,
		'CardHeader',
	);

	const classes = cx([
		styles.Header,
		styles.borderRadius,
		styles.headerFooter,
		styles[size],
		className,
	]);

	return <Flex {...otherProps} className={classes} ref={forwardedRef} />;
}

export default contextConnect(CardHeader, 'CardHeader');
