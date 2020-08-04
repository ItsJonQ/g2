import { connect } from '@wp-g2/context';
import React from 'react';

import * as styles from './List.styles';
const { ListView } = styles;

function List({ type = 'unordered', ...props }) {
	const isNumber = type === 'ordered';
	const asProp = isNumber ? 'ol' : 'ul';

	const cx = [isNumber && styles.ordered];

	return <ListView as={asProp} {...props} cx={cx} />;
}

export default connect(List);
