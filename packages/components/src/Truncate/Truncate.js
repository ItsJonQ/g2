import { connect } from '@wp-g2/provider';
import React from 'react';

import { TruncateView } from './Truncate.styles';
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

	return (
		<TruncateView
			ellipsizeMode={ellipsizeMode}
			numberOfLines={numberOfLines}
			{...props}
		>
			{truncatedContent}
		</TruncateView>
	);
}

export default connect(Truncate);
