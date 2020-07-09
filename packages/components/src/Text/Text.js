import { connect } from '@wp-g2/provider';
import { useFontSize } from '@wp-g2/styled';
import React from 'react';

import { TextView, TruncateTextView } from './Text.styles';

function Text({
	as = 'span',
	isBlock = false,
	lineHeight = 1.2,
	size,
	truncate,
	variant,
	weight = 400,
	...props
}) {
	const fontSize = useFontSize(size);
	const componentProps = {
		...props,
		as,
		isBlock,
		lineHeight,
		size: fontSize,
		variant,
		weight,
	};

	if (truncate) {
		return <TruncateTextView {...componentProps} />;
	}

	return <TextView {...componentProps} />;
}

export default connect(Text);
