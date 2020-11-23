import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { pick } from '@wp-g2/utils';
import React from 'react';

import * as baseButtonStyles from '../base-button/base-button-styles';
import { Heading } from '../Heading';
import * as styles from './Menu.styles';

const sizeStyles = pick(baseButtonStyles, ['large', 'small', 'xSmall']);

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
