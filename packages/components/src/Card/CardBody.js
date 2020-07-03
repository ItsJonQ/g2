import { BaseView } from '@g2/css';
import { connect } from '@g2/provider';
import React from 'react';

function CardBody({ ...props }) {
	return <BaseView __sx={{ padding: 3 }} {...props} />;
}

export default connect(CardBody);
