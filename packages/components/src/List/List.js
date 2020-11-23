import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import * as styles from './List.styles';
const { ListView } = styles;

function List(props, forwardedRef) {
	const { className, type = 'unordered', ...otherProps } = useContextSystem(
		props,
		'List',
	);
	const isNumber = type === 'ordered';
	const asProp = isNumber ? 'ol' : 'ul';

	const classes = cx(isNumber && styles.ordered, className);

	return (
		<ListView
			as={asProp}
			{...otherProps}
			className={classes}
			ref={forwardedRef}
		/>
	);
}

export default contextConnect(List, 'List');
