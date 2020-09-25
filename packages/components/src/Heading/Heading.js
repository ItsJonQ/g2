import {
	connectComponentWithNamespace,
	useContextSystem,
} from '@wp-g2/context';
import { css, cx, get } from '@wp-g2/styles';
import React from 'react';

import { Text } from '../Text';

function Heading(componentProps, forwardedRef) {
	const { as = 'div', className, size = 3, ...props } = useContextSystem(
		componentProps,
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
			{...props}
			ref={forwardedRef}
		/>
	);
}

const ForwardedComponent = React.forwardRef(Heading);

export default connectComponentWithNamespace(ForwardedComponent, 'Heading');
