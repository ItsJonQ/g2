import { connect } from '@wp-g2/context';
import { css, cx, get } from '@wp-g2/styles';
import React from 'react';

import { Text } from '../Text';

function Heading({ as = 'div', className, size = 3, ...props }) {
	const classes = cx([css({ fontSize: get(`fontSizeH${size}`) }), className]);

	return (
		<Text
			as={as}
			className={classes}
			isBlock
			size={size}
			weight={600}
			{...props}
		/>
	);
}

export default connect(Heading, 'Heading');
