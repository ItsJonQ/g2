import { connect } from '@wp-g2/context';
import { BaseView, css, cx } from '@wp-g2/styles';
import React from 'react';

import { Truncate } from '../Truncate';
import * as styles from './Text.styles';

function Text({
	align,
	as = 'span',
	className,
	color,
	display,
	isBlock = false,
	lineHeight = 1.2,
	size,
	truncate,
	upperCase,
	variant,
	weight = 400,
	...props
}) {
	styles.Base = css({
		color,
		display,
		fontSize: size,
		fontWeight: weight,
		lineHeight,
		textAlign: align,
	});

	styles.upperCase = css({ textTransform: 'uppercase' });

	const classes = cx(
		styles.Text,
		styles.Base,
		styles[isBlock && 'block'],
		styles[variant],
		upperCase && styles.upperCase,
		className,
	);

	const componentProps = {
		...props,
		as,
		className: classes,
	};

	if (truncate) {
		return <Truncate {...componentProps} />;
	}

	return <BaseView {...componentProps} />;
}

export default connect(Text);
