import { connect } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import * as styles from './List.styles';
const { ListView } = styles;

function List({ type = 'unordered', ...props }) {
	const isNumber = type === 'ordered';
	const asProp = isNumber ? 'ol' : 'ul';

	const __css = cx([isNumber && styles.ordered]);

	return <ListView as={asProp} {...props} cx={__css} />;
}

export default connect(List, 'List');
