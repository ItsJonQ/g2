import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { View } from '../View';
import { useFlexItem } from './useFlexItem';

function FlexItem(props, forwardedRef) {
	const otherProps = useFlexItem(props);

	return <View {...otherProps} ref={forwardedRef} />;
}

export default contextConnect(FlexItem, 'FlexItem');
