import { connect } from '@wp-g2/provider';
import React from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import { CollapsibleTrigger, useCollapsibleContext } from '../Collapsible';
import { Flex, FlexBlock, FlexItem } from '../Flex';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { usePanelContext } from './Panel.utils';

function PanelHeader({ children, title, ...props }) {
	const { disclosure } = useCollapsibleContext();
	const { isSeamless } = usePanelContext();
	const { visible } = disclosure;

	const content = title ? <Text weight={500}>{title}</Text> : children;
	const icon = visible ? <FiChevronUp /> : <FiChevronDown />;

	return (
		<CollapsibleTrigger
			as={Flex}
			sx={{
				cursor: 'pointer',
				outline: 'none',
				px: isSeamless ? null : 3,
				py: 12,
			}}
			{...props}
		>
			<FlexBlock>{content}</FlexBlock>
			<FlexItem>
				<Text isBlock>
					<Icon icon={icon} />
				</Text>
			</FlexItem>
		</CollapsibleTrigger>
	);
}

export default connect(PanelHeader);
