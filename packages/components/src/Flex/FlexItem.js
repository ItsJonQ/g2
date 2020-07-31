import { connect } from '@wp-g2/provider';
import { BaseView, css } from '@wp-g2/styles';
import React from 'react';

import * as styles from './Flex.styles';
import { useFlexContext } from './Flex.utils';

function FlexItem({ display: displayProp, isBlock = false, ...props }) {
	const { display, gap, isColumn, isLast } = useFlexContext();

	styles.Base = css({
		display: displayProp || display,
		marginBottom: isColumn && !isLast && gap,
		marginRight: !isColumn && !isLast && gap,
	});

	const cx = [
		styles.Item,
		styles.Base,
		styles[(isColumn || isBlock) && 'block'],
	];

	return <BaseView {...props} cx={cx} />;
}

export default connect(FlexItem);
