import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { View } from '../View';
import { useBackground } from './useBackground';

function Background(props, forwardedRef) {
	const otherProps = useBackground(props);

	return <View {...otherProps} ref={forwardedRef} />;
}

export default contextConnect(Background, 'Background');
