import React from 'react';
import { FlexItem } from './Flex.Item';

export function FlexBlock(props) {
	return <FlexItem {...props} isBlock={true} />;
}

FlexBlock.displayName = 'FlexBlock';
