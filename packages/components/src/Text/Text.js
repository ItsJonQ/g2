import { connect } from '@wp-g2/context';
import { BaseView, css, cx, get, getFontSize } from '@wp-g2/styles';
import { getOptimalTextShade } from '@wp-g2/utils';
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
	optimizeReadability,
	size,
	truncate = false,
	upperCase = false,
	variant,
	weight = 400,
	...props
}) {
	const sx = {};

	sx.Base = css({
		color,
		display,
		fontSize: getFontSize(size),
		fontWeight: weight,
		lineHeight,
		textAlign: align,
	});

	sx.upperCase = css({ textTransform: 'uppercase' });

	sx.optimalTextColor = null;

	if (optimizeReadability) {
		const isOptimalTextColorDark =
			getOptimalTextShade(optimizeReadability) === 'dark';

		sx.optimalTextColor = isOptimalTextColorDark
			? css({ color: get('black') })
			: css({ color: get('white') });
	}

	const classes = cx(
		styles.Text,
		sx.Base,
		sx.optimalTextColor,
		styles[isBlock && 'block'],
		styles[variant],
		upperCase && sx.upperCase,
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

export default connect(Text, 'Text');
