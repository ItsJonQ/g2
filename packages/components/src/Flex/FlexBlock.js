import React from 'react';
import { connect } from '@g2/provider';
import FlexItem from './FlexItem';

function FlexBlock(props) {
	return <FlexItem {...props} isBlock={true} />;
}

export default connect(FlexBlock);
