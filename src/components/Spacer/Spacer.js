import React from 'react';
import View from '../View';

function Spacer({ mb = 2, ...props }) {
	return <View mb={mb} {...props} />;
}

export default Spacer;
