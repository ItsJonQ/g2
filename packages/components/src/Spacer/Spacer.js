import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { View } from '../View';
import { useSpacer } from './useSpacer';

function Spacer(props, forwardedRef) {
	const otherProps = useSpacer(props);

	return <View {...otherProps} ref={forwardedRef} />;
}

export default contextConnect(Spacer, 'Spacer');
