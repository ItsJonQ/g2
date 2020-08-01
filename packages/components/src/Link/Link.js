import { connect } from '@wp-g2/provider';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { Text } from '../Text';
import * as styles from './Link.styles';

function Link({ className, isPlain, ...props }) {
	const classes = cx([styles.BaseLink, !isPlain && styles.Link], className);

	return <Text as="a" {...props} className={classes} />;
}

export default connect(Link);
