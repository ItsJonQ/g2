import React from 'react';
import FlexItem from './Flex.Item';

function FlexBlock(props) {
	return <FlexItem {...props} isBlock={true} />;
}

FlexBlock.displayName = 'FlexBlock';

export default FlexBlock;
