import { connect } from '@wp-g2/provider';
import { css, cx, system } from '@wp-g2/system';
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

	const classes = cx({
		[styles.Text]: true,
		[styles.Base]: true,
		[styles.Block]: isBlock,
		[styles.Destructive]: isBlock,
		[styles.Positive]: isBlock,
		[styles.Muted]: isBlock,
		[className]: true,
	});

	const componentProps = {
		...props,
		as,
		className: classes,
	};

	if (truncate) {
		return <Truncate {...componentProps} />;
	}

	return <system.span {...componentProps} />;
}

export default connect(Text);
