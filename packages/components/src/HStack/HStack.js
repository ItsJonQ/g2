import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { View } from '../View';
import { useHStack } from './useHStack';

function HStack(props, forwardedRef) {
	const { children, ...otherProps } = useHStack(props);

	return (
		<View {...otherProps} ref={forwardedRef}>
			{children}
		</View>
	);
}

export default contextConnect(HStack, 'HStack');
