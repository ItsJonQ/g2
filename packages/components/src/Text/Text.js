import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { View } from '../View';
import { useText } from './useText';

function Text(props, forwardedRef) {
	const otherProps = useText(props);

	return <View as="span" {...otherProps} ref={forwardedRef} />;
}

export default contextConnect(Text, 'Text');
