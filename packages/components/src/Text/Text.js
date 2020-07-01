import React from 'react';
import { connect } from '@g2/provider';
import { TextView } from './Text.styles';

function Text({ as = 'span', weight = 400, lineHeight = 1.2, ...props }) {
	return (
		<TextView as={as} lineHeight={lineHeight} weight={weight} {...props} />
	);
}

export default connect(Text);
