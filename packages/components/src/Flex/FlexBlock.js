import {
	connectAndForwardRefComponent,
	useContextSystem,
} from '@wp-g2/context';
import React from 'react';

import FlexItem from './FlexItem';

function FlexBlock(props, forwardedRef) {
	const otherProps = useContextSystem(props, 'FlexBlock');

	return <FlexItem {...otherProps} isBlock={true} ref={forwardedRef} />;
}

export default connectAndForwardRefComponent(FlexBlock, 'FlexBlock');
