import { connect } from '@g2/provider';
import React from 'react';

import { TextView } from './Text.styles';

function Text({
	as = 'span',
	forwardedRef,
	weight = 400,
	lineHeight = 1.2,
	...props
}) {
	return (
		<TextView
			{...props}
			as={as}
			lineHeight={lineHeight}
			ref={forwardedRef}
			weight={weight}
		/>
	);
}

export default connect(Text);
