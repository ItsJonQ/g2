import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { View } from '../View';
import { useTruncate } from './useTruncate';

export function Truncate(props, forwardedRef) {
	const otherProps = useTruncate(props);

	return <View as="span" {...otherProps} ref={forwardedRef} />;
}

export default contextConnect(Truncate, 'Truncate');
