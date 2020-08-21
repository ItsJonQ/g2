import { connect } from '@wp-g2/context';
import React from 'react';

import FlexItem from './FlexItem';

function FlexBlock(props) {
	return <FlexItem {...props} isBlock={true} />;
}

export default connect(FlexBlock, 'FlexBlock');
