import { connect } from '@wp-g2/provider';
import { cx } from '@wp-g2/styles';
import React from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import { CollapsibleTrigger, useCollapsibleContext } from '../Collapsible';
import { Flex, FlexBlock, FlexItem } from '../Flex';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { usePanelContext } from './Panel.Context';
import * as styles from './Panel.styles';

function PanelHeader({ children, className, title, ...props }) {
	const { disclosure } = useCollapsibleContext();
	const { isSeamless } = usePanelContext();
	const { visible } = disclosure;

	const content = title ? <Text weight={500}>{title}</Text> : children;
	const icon = visible ? <FiChevronUp /> : <FiChevronDown />;

	const classes = cx([
		styles.PanelHeader,
		isSeamless && styles.seamless,
		className,
	]);

	return (
		<CollapsibleTrigger as={Flex} className={classes} {...props}>
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
