import { connect } from '@g2/provider';
import React from 'react';

import { CardFooterView } from './Card.styles';

function CardFooter({ ...props }) {
	return <CardFooterView {...props} />;
}

export default connect(CardFooter);
