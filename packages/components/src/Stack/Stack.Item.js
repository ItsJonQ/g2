import React from 'react';
import { FlexItem } from '../Flex';

export function StackItem({ display = 'inline-block', ...props }) {
	return <FlexItem display={display} {...props} />;
}

StackItem.displayName = 'StackItem';
