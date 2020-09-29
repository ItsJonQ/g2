import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import * as styles from './List.styles';
const { ListView } = styles;

function List(props, forwardedRef) {
	const { type = 'unordered', ...otherProps } = useContextSystem(
		props,
		'List',
	);
	const isNumber = type === 'ordered';
	const asProp = isNumber ? 'ol' : 'ul';

	const __css = cx(isNumber && styles.ordered);

	return (
		<ListView as={asProp} {...otherProps} cx={__css} ref={forwardedRef} />
	);
}

export default contextConnect(List, 'List');
