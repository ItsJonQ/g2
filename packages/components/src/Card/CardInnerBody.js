import { connect } from '@wp-g2/provider';
import { BaseView } from '@wp-g2/styles';
import React from 'react';

import * as styles from './Card.styles';

function CardInnerBody({ ...props }) {
	const cx = [styles.InnerBody];

	return <BaseView {...props} cx={cx} />;
}

export default connect(CardInnerBody);
