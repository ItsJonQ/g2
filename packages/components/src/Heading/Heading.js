import {
	connectAndForwardRefComponent,
	useContextSystem,
} from '@wp-g2/context';
import { css, cx, get } from '@wp-g2/styles';
import React from 'react';

import { Text } from '../Text';

function Heading(props, forwardedRef) {
	const { as = 'div', className, size = 3, ...otherProps } = useContextSystem(
		props,
		'Heading',
	);
	const classes = cx([css({ fontSize: get(`fontSizeH${size}`) }), className]);

	return (
		<Text
			as={as}
			className={classes}
			isBlock
			size={size}
			weight={600}
			{...otherProps}
			ref={forwardedRef}
		/>
	);
}

export default connectAndForwardRefComponent(Heading, 'Heading');
