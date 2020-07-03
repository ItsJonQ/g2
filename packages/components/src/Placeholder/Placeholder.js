import { BaseView } from '@g2/css';
import { connect } from '@g2/provider';
import React from 'react';

function Placeholder({ height = 36, ...props }) {
	return <BaseView __sx={{ background: '#eee', height }} {...props} />;
}

export default connect(Placeholder);
