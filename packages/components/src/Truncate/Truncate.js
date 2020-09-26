import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, cx } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';
import * as styles from './Truncate.styles';
import {
	TRUNCATE_ELLIPSIS,
	TRUNCATE_TYPE,
	truncateContent,
} from './Truncate.utils';

export function Truncate(props, forwardedRef) {
	const {
		children,
		ellipsis = TRUNCATE_ELLIPSIS,
		ellipsizeMode = TRUNCATE_TYPE.auto,
		limit = 0,
		numberOfLines = 0,
		...otherProps
	} = useContextSystem(props, 'Truncate');

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

	const __css = cx([
		shouldTruncate && !numberOfLines && styles.Truncate,
		shouldTruncate && numberOfLines && sx.numberOfLines,
	]);

	return (
		<View as="span" {...otherProps} cx={__css} ref={forwardedRef}>
			{truncatedContent}
		</View>
	);
}

export default contextConnect(Truncate, 'Truncate');
