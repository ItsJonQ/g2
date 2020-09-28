import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { View } from '../View';
import { useSurface } from './useSurface';

function Surface(props, forwardedRef) {
	const otherProps = useSurface(props);

	return <View {...otherProps} ref={forwardedRef} />;
}

export default contextConnect(Surface, 'Surface');
