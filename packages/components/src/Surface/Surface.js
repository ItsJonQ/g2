import { connect } from '@wp-g2/provider';
import { BaseView } from '@wp-g2/styles';
import React from 'react';

import * as styles from './Surface.styles';

function Surface(props) {
	const cx = [styles.Surface];

	return <BaseView {...props} cx={cx} />;
}

export default connect(Surface, 'Surface');
