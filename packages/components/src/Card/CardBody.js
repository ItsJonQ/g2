import { connect } from '@wp-g2/provider';
import React from 'react';

import { CardBodyView } from './Card.styles';

function CardBody({ ...props }) {
	return <CardBodyView {...props} />;
}

export default connect(CardBody);
