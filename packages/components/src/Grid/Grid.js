import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { View } from '../View';
import { useGrid } from './useGrid';

function Grid(props, forwardedRef) {
	const otherProps = useGrid(props);

	return <View {...otherProps} ref={forwardedRef} />;
}

export default contextConnect(Grid, 'Grid');
