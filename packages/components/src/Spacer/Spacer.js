import { BaseView } from '@wp-g2/css';
import { connect } from '@wp-g2/provider';
import React from 'react';

function Spacer({ mb = 2, ...props }) {
	return <BaseView {...props} mb={mb} />;
}

export default connect(Spacer);
