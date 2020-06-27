import React from 'react';
import Flex from '../Flex';

function StackItem({ display = 'inline-block', ...props }) {
	return <Flex.Item display={display} {...props} />;
}

StackItem.displayName = 'StackItem';

export default StackItem;
