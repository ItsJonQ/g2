import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { View } from '../View';
import { useFlex } from './useFlex';

export function Flex(props, forwardedRef) {
	const { children, ...otherProps } = useFlex(props);

	return (
		<View {...otherProps} ref={forwardedRef}>
			{children}
		</View>
	);
}

export default contextConnect(Flex, 'Flex');
