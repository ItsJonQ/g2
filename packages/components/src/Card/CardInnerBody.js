import { connect } from '@wp-g2/context';
import { View } from '@wp-g2/styles';
import React from 'react';

import * as styles from './Card.styles';

function CardInnerBody({ ...props }) {
	const __css = [styles.InnerBody];

	return <View {...props} cx={__css} />;
}

export default connect(CardInnerBody, 'CardInnerBody');
