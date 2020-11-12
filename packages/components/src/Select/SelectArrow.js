import { FiChevronDown } from '@wp-g2/icons';
import React from 'react';

import { Icon } from '../Icon';
import { Text } from '../Text';
import * as styles from './Select.styles';

const { ArrowWrapperView } = styles;

const SelectArrow = () => {
	return (
		<ArrowWrapperView>
			<Text isBlock variant="muted">
				<Icon icon={<FiChevronDown />} size={14} />
			</Text>
		</ArrowWrapperView>
	);
};

export default React.memo(SelectArrow);
