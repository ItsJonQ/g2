import { connect } from '@wp-g2/provider';
import { BaseView } from '@wp-g2/styled';
import React from 'react';

function FlexItem({ display, isBlock = false, ...props }) {
	return (
		<BaseView
			{...props}
			__css={{
				display: display || 'block',
				flex: isBlock ? 1 : null,
				maxWidth: '100%',
				minWidth: 0,
			}}
		/>
	);
}

export default connect(FlexItem);
