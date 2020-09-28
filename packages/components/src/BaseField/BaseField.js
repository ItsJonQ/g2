import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { View } from '../View';
import { useBaseField } from './useBaseField';

function BaseField(props, forwardedRef) {
	const otherProps = useBaseField(props);

	return <View {...otherProps} ref={forwardedRef} />;
}

export default contextConnect(BaseField, 'BaseField');
