import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { View } from '../View';
import { useSubheading } from './useSubheading';

function Subheading(props, forwardedRef) {
	const otherProps = useSubheading(props);

	return <View {...otherProps} ref={forwardedRef} />;
}

export default contextConnect(Subheading, 'Subheading');
