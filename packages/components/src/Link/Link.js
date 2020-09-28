import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { Text } from '../Text';
import * as styles from './Link.styles';

function Link(props, forwardedRef) {
	const { className, isPlain, ...otherProps } = useContextSystem(
		props,
		'Link',
	);
	const classes = cx([styles.BaseLink, !isPlain && styles.Link], className);

	return (
		<Text as="a" {...otherProps} className={classes} ref={forwardedRef} />
	);
}

export default contextConnect(Link, 'Link');
