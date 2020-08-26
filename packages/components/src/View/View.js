import { connect } from '@wp-g2/context';
import { BaseView } from '@wp-g2/styles';
import React from 'react';

function View({ children, forwardedRef, ...props }) {
	return (
		<BaseView {...props} ref={forwardedRef}>
			{children}
		</BaseView>
	);
}
export default connect(View, 'View');
