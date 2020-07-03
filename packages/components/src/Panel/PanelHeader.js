import { connect } from '@g2/provider';
import React from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import { CollapsibleTrigger, useCollapsibleContext } from '../Collapsible';
import { Flex, FlexBlock, FlexItem } from '../Flex';
import { Icon } from '../Icon';
import { Text } from '../Text';

function PanelHeader({ children, title, ...props }) {
	const { disclosure } = useCollapsibleContext();
	const { visible } = disclosure;

	const content = title ? <Text weight={500}>{title}</Text> : children;
	const icon = visible ? <FiChevronUp /> : <FiChevronDown />;

	return (
		<CollapsibleTrigger
			as={Flex}
			sx={{
				'&:active': {
					userSelect: 'none',
				},
				cursor: 'pointer',
				outline: 'none',
				px: 3,
				py: 2,
				transform: 'translateZ(0)',
			}}
			{...props}
		>
			<FlexBlock>{content}</FlexBlock>
			<FlexItem>
				<Icon icon={icon} />
			</FlexItem>
		</CollapsibleTrigger>
	);
}

export default connect(PanelHeader);
