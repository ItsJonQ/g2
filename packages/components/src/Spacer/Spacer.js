import React from 'react';
import { BaseView } from '@g2/css';
import { connect } from '@g2/provider';

function Spacer({ mb = 2, ...props }) {
	return <BaseView mb={mb} {...props} />;
}

export default connect(Spacer);
