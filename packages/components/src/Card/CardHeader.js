import { connect } from '@g2/provider';
import React from 'react';

import { CardHeaderView } from './Card.styles';

function CardHeader({ ...props }) {
	return <CardHeaderView {...props} />;
}

export default connect(CardHeader);
