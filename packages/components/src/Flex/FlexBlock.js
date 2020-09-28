import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { View } from '../View';
import { useFlexBlock } from './useFlexBlock';

function FlexBlock(props, forwardedRef) {
	const otherProps = useFlexBlock(props);

	return <View {...otherProps} ref={forwardedRef} />;
}

export default contextConnect(FlexBlock, 'FlexBlock');
