import { BaseView } from '@g2/css';
import { connect } from '@g2/provider';
import React from 'react';

function Spacer({ forwardedRef, mb = 2, ...props }) {
	return <BaseView {...props} mb={mb} ref={forwardedRef} />;
}

export default connect(Spacer);
