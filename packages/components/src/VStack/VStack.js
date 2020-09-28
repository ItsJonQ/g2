import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { View } from '../View';
import { useVStack } from './useVStack';

function VStack(props, forwardedRef) {
	const otherProps = useVStack(props);

	return <View {...otherProps} ref={forwardedRef} />;
}

export default contextConnect(VStack, 'VStack');
