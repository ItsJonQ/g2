import { connect } from '@wp-g2/provider';
import React from 'react';

import { Scrollable } from '../Scrollable';
import * as styles from './Card.styles';

function CardBody({ className, ...props }) {
	const cx = [styles.Body, styles.borderRadius, className];

	return <Scrollable {...props} className={cx} />;
}

export default connect(CardBody);
