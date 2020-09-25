import {
	connectAndForwardRefComponent,
	useContextSystem,
} from '@wp-g2/context';
import React from 'react';

import { HStack } from '../HStack';

function VStack(props, forwardedRef) {
	const otherProps = useContextSystem(props, 'VStack');

	return <HStack {...otherProps} direction="column" ref={forwardedRef} />;
}

export default connectAndForwardRefComponent(VStack, 'VStack');
