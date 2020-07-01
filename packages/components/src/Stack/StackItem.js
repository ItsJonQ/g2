import React from 'react';
import { connect } from '@g2/provider';
import { FlexItem } from '../Flex';

function StackItem({ display = 'inline-block', ...props }) {
	return <FlexItem display={display} {...props} />;
}

export default connect(StackItem);
