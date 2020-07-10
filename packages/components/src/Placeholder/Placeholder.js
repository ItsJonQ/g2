import { connect } from '@wp-g2/provider';
import React from 'react';

import { PlaceholderView } from './Placeholder.styles';

function Placeholder({ height = 36, width, ...props }) {
	return <PlaceholderView style={{ height, width }} {...props} />;
}

export default connect(Placeholder);
