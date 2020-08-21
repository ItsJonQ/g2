import { connect } from '@wp-g2/context';
import { BaseView, css } from '@wp-g2/styles';
import React from 'react';

import * as styles from './Truncate.styles';
import {
	TRUNCATE_ELLIPSIS,
	TRUNCATE_TYPE,
	truncateContent,
} from './Truncate.utils';

export function Truncate({
	as = 'span',
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
		<BaseView
			{...props}
			as={as}
			cx={cx}
			ellipsizeMode={ellipsizeMode}
			numberOfLines={numberOfLines}
		>
			{truncatedContent}
		</BaseView>
	);
}

export default connect(Truncate, 'Truncate');
