import { connect } from '@wp-g2/context';
import { BaseView, css } from '@wp-g2/styles';
import React from 'react';

import { useFlexContext } from './Flex.Context';
import * as styles from './Flex.styles';

export type FlexItemProps = {
	children?: any;
	display?: any;
	isBlock?: boolean;
};

function FlexItem({
	display: displayProp,
	isBlock = false,
	...props
}: FlexItemProps) {
	const { display, gap, isColumn, isLast } = useFlexContext();

	const ds: { [x: string]: any } = {};

	ds.Base = css({
		display: displayProp || display,
		marginBottom: isColumn && !isLast && gap,
		marginRight: !isColumn && !isLast && gap,
	});

	const cx = [styles.Item, ds.Base, isBlock && styles.block];

	return <BaseView {...props} cx={cx} />;
}

export default connect(FlexItem);
