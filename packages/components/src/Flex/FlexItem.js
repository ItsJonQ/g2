import { connect } from '@wp-g2/context';
import { BaseView, css } from '@wp-g2/styles';
import React from 'react';

import { useFlexContext } from './Flex.Context';
import * as styles from './Flex.styles';

function FlexItem({ display: displayProp, isBlock = false, ...props }) {
	const { display, gap, isColumn, isLast, isReverse } = useFlexContext();
	const sx = {};
	sx.Base = css({
		display: displayProp || display,
		marginBottom: isColumn && !isLast && gap,
		[isReverse ? 'marginLeft' : 'marginRight']: !isColumn && !isLast && gap,
	});

	const cx = [styles.Item, sx.Base, isBlock && styles.block];

	return <BaseView {...props} cx={cx} />;
}

export default connect(FlexItem, 'FlexItem');
