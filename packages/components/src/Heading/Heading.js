import { connect } from '@wp-g2/provider';
import React from 'react';

import { HeadingView } from './Heading.styles';

function Heading({ as = 'div', size = 3, ...props }) {
	return <HeadingView as={as} isBlock size={size} {...props} />;
}

export default connect(Heading);
