import { connect } from '@wp-g2/context';
import React from 'react';

import { Flex } from '../Flex';
import * as styles from './Card.styles';

function CardHeader({ className, ...props }) {
	const cx = [
		styles.Header,
		styles.borderRadius,
		styles.headerFooter,
		className,
	];

	return <Flex {...props} className={cx} />;
}

export default connect(CardHeader);
