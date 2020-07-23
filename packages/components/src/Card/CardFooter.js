import { connect } from '@wp-g2/provider';
import React from 'react';

import { Flex } from '../Flex';
import * as styles from './Card.styles';

function CardFooter({ className, ...props }) {
	const cx = [
		styles.Footer,
		styles.borderRadius,
		styles.headerFooter,
		className,
	];

	return <Flex {...props} className={cx} />;
}

export default connect(CardFooter);
