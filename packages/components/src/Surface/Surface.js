import { connect } from '@wp-g2/provider';
import { system } from '@wp-g2/system';
import React from 'react';

import * as styles from './Surface.styles';

function Surface(props) {
	const cx = [styles.Surface];
	return <system.div {...props} cx={cx} />;
}

export default connect(Surface, 'Surface');
