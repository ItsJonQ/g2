import { BaseView } from '@g2/css';
import { connect } from '@g2/provider';
import React from 'react';

function FlexItem({ display, forwardedRef, isBlock = false, ...props }) {
	return (
		<BaseView
			{...props}
			__sx={{
				display: isBlock ? 'block' : display,
				flex: isBlock ? 1 : null,
				minWidth: 0,
				maxWidth: '100%',
			}}
			ref={forwardedRef}
		/>
	);
}

export default connect(FlexItem);
