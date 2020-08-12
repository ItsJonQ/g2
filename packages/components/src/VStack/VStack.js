import { connect } from '@wp-g2/context';
import React from 'react';

import { HStack } from '../HStack';

function VStack({ forwardedRef, ...props }) {
	return <HStack {...props} direction="column" ref={forwardedRef} />;
}

export default connect(VStack);
