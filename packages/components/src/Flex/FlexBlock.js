import {
	connectAndForwardRefComponent,
	useContextSystem,
} from '@wp-g2/context';
import React from 'react';

import FlexItem from './FlexItem';

function FlexBlock(componentProps, forwardedRef) {
	const props = useContextSystem(componentProps, 'FlexBlock');
	return <FlexItem {...props} isBlock={true} ref={forwardedRef} />;
}

export default connectAndForwardRefComponent(FlexBlock, 'FlexBlock');
