import { BaseView } from '@g2/css';
import { connect } from '@g2/provider';
import React from 'react';

function CardInnerBody({ ...props }) {
	return <BaseView __sx={{ mx: -3 }} {...props} />;
}

export default connect(CardInnerBody);
