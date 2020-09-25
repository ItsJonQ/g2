import {
	connectAndForwardRefComponent,
	useContextSystem,
} from '@wp-g2/context';
import React from 'react';

import { HStack } from '../HStack';

function VStack(componentProps, forwardedRef) {
	const props = useContextSystem(componentProps, 'VStack');

	return <HStack {...props} direction="column" ref={forwardedRef} />;
}

export default connectAndForwardRefComponent(VStack, 'VStack');
