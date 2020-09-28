import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { View } from '../View';
import { useLink } from './useLink';

function Link(props, forwardedRef) {
	const otherProps = useLink(props);

	return <View as="a" {...otherProps} ref={forwardedRef} />;
}

export default contextConnect(Link, 'Link');
