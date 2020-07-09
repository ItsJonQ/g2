import { BaseView } from '@wp-g2/css';
import { connect } from '@wp-g2/provider';
import React from 'react';

function CardInnerBody({ ...props }) {
	return <BaseView __css={{ mx: -3 }} {...props} />;
}

export default connect(CardInnerBody);
