import { connect } from '@wp-g2/provider';
import React from 'react';

import { HeadingView } from './Heading.styles';

function Heading({ size = 3, ...props }) {
	return <HeadingView size={size} {...props} />;
}

export default connect(Heading);
