import { BaseView } from '@g2/css';
import { connect } from '@g2/provider';
import React from 'react';

function ComponentName({ ...props }) {
	return <BaseView {...props} />;
}

export default connect(ComponentName);
