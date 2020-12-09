import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { pick } from 'lodash';
import React from 'react';

import * as baseButtonStyles from '../BaseButton/BaseButton.styles';
import { Heading } from '../Heading';
import * as styles from './Menu.styles';

const sizeStyles = pick(baseButtonStyles, ['large', 'small', 'xSmall']);

/**
 * @typedef OwnProps
 * @property {keyof sizeStyles} size
 */

/**
 * @typedef {import('../Heading/types').Props & OwnProps} Props
 */

/**
 *
 * @param {import('@wp-g2/create-styles').ViewOwnProps<Props, 'div'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
function MenuHeader(props, forwardedRef) {
	const { children, className, size, ...otherProps } = useContextSystem(
		props,
		'MenuHeader',
	);

	const classes = cx(styles.MenuHeader, sizeStyles[size], className);

	return (
		<Heading
			size={5}
			{...otherProps}
			className={classes}
			ref={forwardedRef}
		>
			{children}
		</Heading>
	);
}

export default contextConnect(MenuHeader, 'MenuHeader');
