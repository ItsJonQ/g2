import { useFontSize } from '@g2/css';
import { connect } from '@g2/provider';
import React from 'react';

import { TextView } from './Text.styles';

function Text({
	as = 'span',
	isBlock = false,
	lineHeight = 1.2,
	size,
	weight = 400,
	...props
}) {
	const fontSize = useFontSize(size);

	return (
		<TextView
			{...props}
			as={as}
			isBlock={isBlock}
			lineHeight={lineHeight}
			size={fontSize}
			weight={weight}
		/>
	);
}

export default connect(Text);
