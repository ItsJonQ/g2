import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { View } from '../View';
import { useElevation } from './useElevation';

function Elevation(props, forwardedRef) {
	const otherProps = useElevation(props);

	return <View {...otherProps} ref={forwardedRef} />;
}

export default contextConnect(Elevation, 'Elevation');
