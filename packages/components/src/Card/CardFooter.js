import { connect } from '@wp-g2/context';
import React from 'react';

import { Flex } from '../Flex';
import * as styles from './Card.styles';

function CardFooter({ className, size, ...props }) {
	const cx = [
		styles.Footer,
		styles.borderRadius,
		styles.headerFooter,
		styles[size],
		className,
	];

	return <Flex {...props} className={cx} />;
}

export default connect(CardFooter, 'CardFooter');
