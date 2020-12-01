import { chevronDown } from '@wordpress/icons';
import React from 'react';

import { Icon } from '../Icon';
import { Text } from '../Text';
import * as styles from './Select.styles';

const { ArrowWrapperView } = styles;

const SelectArrow = () => {
	return (
		<ArrowWrapperView>
			<Text isBlock variant="muted">
				<Icon icon={chevronDown} size={16} />
			</Text>
		</ArrowWrapperView>
	);
};

export default React.memo(SelectArrow);
