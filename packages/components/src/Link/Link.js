import { connect } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { Text } from '../Text';
import * as styles from './Link.styles';

function Link({ className, forwardedRef, isPlain, ...props }) {
	const classes = cx([styles.BaseLink, !isPlain && styles.Link], className);

	return <Text as="a" {...props} className={classes} ref={forwardedRef} />;
}

export default connect(Link, 'Link');
