import { connect } from '@wp-g2/provider';
import { BaseView, css } from '@wp-g2/system';
import React from 'react';

import * as styles from './Flex.styles';

function FlexItem({ display, isBlock = false, ...props }) {
	styles.Base = css({ display });
	const cx = [styles.Item, styles.Base, styles[isBlock && 'block']];

	return <BaseView {...props} cx={cx} />;
}

export default connect(FlexItem);
