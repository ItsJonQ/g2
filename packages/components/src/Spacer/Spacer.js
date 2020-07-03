import { BaseView } from '@g2/css';
import { connect } from '@g2/provider';
import React from 'react';

function Spacer({ mb = 2, ...props }) {
	return <BaseView {...props} mb={mb} />;
}

export default connect(Spacer);
