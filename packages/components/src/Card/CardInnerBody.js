import { connect } from '@wp-g2/provider';
import { BaseView } from '@wp-g2/styled';
import React from 'react';

function CardInnerBody({ ...props }) {
	return <BaseView __css={{ mx: -3 }} {...props} />;
}

export default connect(CardInnerBody);
