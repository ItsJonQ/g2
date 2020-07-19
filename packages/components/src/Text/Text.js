import { connect } from '@wp-g2/provider';
import { BaseView, css, cx } from '@wp-g2/system';
import React from 'react';

import { Truncate } from '../Truncate';
import * as styles from './Text.styles';

function Text({
	align,
	as = 'span',
	className,
	display,
	isBlock = false,
	lineHeight = 1.2,
	size,
	truncate,
	variant,
	weight = 400,
	...props
}) {
	styles.Base = css({
		display,
		fontSize: size,
		fontWeight: weight,
		lineHeight,
		textAlign: align,
	});

	const classes = cx(
		[styles.Text, styles.Base],
		{
			[styles.Block]: isBlock,
			[styles.Destructive]: variant === 'destructive',
			[styles.Positive]: variant === 'positive',
			[styles.Muted]: variant === 'muted',
		},
		[className],
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
