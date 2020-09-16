import { connect } from '@wp-g2/context';
import { css, cx } from '@wp-g2/styles';
import React from 'react';

import { BaseButton } from '../BaseButton';
import * as styles from './Button.styles';

function Button({
	className,
	css: cssProp,
	forwardedRef,
	isControl = false,
	isSubtle = false,
	size = 'medium',
	variant = 'secondary',
	...props
}) {
	const classes = cx([
		styles.Button,
		styles[variant],
		styles[size],
		isSubtle && styles.subtle,
		isControl && styles.control,
		isSubtle && isControl && styles.subtleControl,
		css(cssProp),
		className,
	]);

	return <BaseButton className={classes} ref={forwardedRef} {...props} />;
}

export default connect(Button, 'Button');
