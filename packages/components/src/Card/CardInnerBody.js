import { connect } from '@wp-g2/context';
import { View } from '@wp-g2/styles';
import React from 'react';

import * as styles from './Card.styles';

function CardInnerBody({ ...props }) {
	const cx = [styles.InnerBody];

	return <View {...props} cx={cx} />;
}

export default connect(CardInnerBody, 'CardInnerBody');
