import { connect } from '@wp-g2/provider';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { FlexItem } from '../Flex';
import { useControlGroupContext } from './ControlGroup.utils';
import * as styles from './ControlGroupItem.styles';

function ControlGroupItem({ className, ...props }) {
	const { isFirst, isOnly } = useControlGroupContext();
	const classes = cx([!isFirst && !isOnly && styles.offset, className]);

	return <FlexItem {...props} className={classes} />;
}

export default connect(ControlGroupItem, 'ControlGroupItem');
