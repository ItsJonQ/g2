import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { createAnimated } from './Animated.utils';
import { useAnimated } from './useAnimated';

function Animated(props, forwardedRef) {
	const { as, children, ...otherProps } = useAnimated(props);

	const tagName = typeof as === 'string' ? as : 'div';
	const Component = createAnimated(tagName);

	return (
		<Component {...otherProps} ref={forwardedRef}>
			{children}
		</Component>
	);
}

export default contextConnect(Animated, 'Animated');
