import { connect } from '@wp-g2/context';
import { css } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';
import * as styles from './Truncate.styles';
import {
	TRUNCATE_ELLIPSIS,
	TRUNCATE_TYPE,
	truncateContent,
} from './Truncate.utils';

export function Truncate({
	children,
	ellipsis = TRUNCATE_ELLIPSIS,
	ellipsizeMode = TRUNCATE_TYPE.auto,
	limit = 0,
	numberOfLines = 0,
	...props
}) {
	const truncatedContent = truncateContent(children, {
		ellipsis,
		ellipsizeMode,
		limit,
	});

	const shouldTruncate = ellipsizeMode === TRUNCATE_TYPE.auto;
	const sx = {};

	sx.numberOfLines = css`
		-webkit-box-orient: vertical;
		-webkit-line-clamp: ${numberOfLines};
		display: -webkit-box;
		overflow: hidden;
	`;

	const cx = [
		shouldTruncate && !numberOfLines && styles.Truncate,
		shouldTruncate && numberOfLines && sx.numberOfLines,
	];

	return (
		<View as="span" {...props} cx={cx}>
			{truncatedContent}
		</View>
	);
}

export default connect(Truncate, 'Truncate');
