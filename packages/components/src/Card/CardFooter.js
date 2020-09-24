import { connect } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { Flex } from '../Flex';
import * as styles from './Card.styles';

function CardFooter({ className, size = 'medium', ...props }) {
	const classes = cx([
		styles.borderRadius,
		styles.headerFooter,
		styles[size],
		className,
	]);

	return <Flex {...props} className={classes} />;
}

export default connect(CardFooter, 'CardFooter');
