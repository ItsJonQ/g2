import { connect } from '@wp-g2/provider';
import { BaseView } from '@wp-g2/styled';
import React from 'react';

function Spacer({ mb = 2, ...props }) {
	return <BaseView mb={mb} {...props} />;
}

export default connect(Spacer);
