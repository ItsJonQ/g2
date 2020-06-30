import React from 'react';
import BaseView from '../BaseView';

function Spacer({ mb = 2, ...props }) {
	return <BaseView mb={mb} {...props} />;
}

export default Spacer;
