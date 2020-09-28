import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { View } from '../View';
import { useHeading } from './useHeading';

function Heading(props, forwardedRef) {
	const otherProps = useHeading(props);

	return <View {...otherProps} ref={forwardedRef} />;
}

export default contextConnect(Heading, 'Heading');
