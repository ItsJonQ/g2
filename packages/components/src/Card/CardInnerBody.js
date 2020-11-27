import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';
import * as styles from './Card.styles';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<{}, 'div'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
function CardInnerBody(props, forwardedRef) {
	const { className, ...otherProps } = useContextSystem(
		props,
		'CardInnerBody',
	);

	const classes = cx(styles.InnerBody, className);

	return <View {...otherProps} className={classes} ref={forwardedRef} />;
}

/**
 * @type {import('@wp-g2/create-styles').PolymorphicComponent<'div', {}>
 */
const ConnectedCardInnerBody = contextConnect(CardInnerBody, 'CardInnerBody');

export default ConnectedCardInnerBody;
