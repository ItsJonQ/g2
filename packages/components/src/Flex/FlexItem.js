import React from 'react';
import { BaseView } from '@g2/css';
import { connect } from '@g2/provider';

function FlexItem({ display, isBlock = false, ...props }) {
	return (
		<BaseView
			__sx={{
				display: isBlock ? 'block' : display,
				flex: isBlock ? 1 : null,
				minWidth: 0,
				maxWidth: '100%',
			}}
			{...props}
		/>
	);
}

export default connect(FlexItem);
