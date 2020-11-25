import { contextConnect } from '@wp-g2/context';
import React from 'react';

import SelectElement from './SelectElement';

function Select(props, forwardedRef) {
	return <SelectElement {...props} as="select" ref={forwardedRef} />;
}

export default contextConnect(Select, 'Select');
