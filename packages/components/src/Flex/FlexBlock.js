import { connect } from '@g2/provider';
import React from 'react';

import FlexItem from './FlexItem';

function FlexBlock({ forwardedRef, ...props }) {
	return <FlexItem {...props} isBlock={true} ref={forwardedRef} />;
}

export default connect(FlexBlock);
