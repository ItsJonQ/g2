import { useFontSize } from '@g2/css';
import { connect } from '@g2/provider';
import React from 'react';

import { TextView } from './Text.styles';

function Text({
	as = 'span',
	forwardedRef,
	size,
	weight = 400,
	lineHeight = 1.2,
	...props
}) {
	const fontSize = useFontSize(size);

	return (
		<TextView
			{...props}
			as={as}
			lineHeight={lineHeight}
			ref={forwardedRef}
			size={fontSize}
			weight={weight}
		/>
	);
}

export default connect(Text);
