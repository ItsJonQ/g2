import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { ArrowIndicator } from '../ArrowIndicator';
import { CollapsibleTrigger, useCollapsibleContext } from '../Collapsible';
import { Flex, FlexBlock } from '../Flex';
import { Heading } from '../Heading';
import { HStack } from '../HStack';
import { Text } from '../Text';
import { usePanelContext } from './Panel.Context';
import * as styles from './Panel.styles';

function PanelHeader(props, forwardedRef) {
	const {
		actions,
		children,
		className,
		hideArrow = false,
		title,
		...otherProps
	} = useContextSystem(props, 'PanelHeader');
	const { disclosure } = useCollapsibleContext();
	const { collapsible, seamless } = usePanelContext();
	const { visible } = disclosure || {};
	const showArrow = !hideArrow;
	const direction = visible ? 'down' : 'right';

	let content = title ? <Heading size={5}>{title}</Heading> : children;
	if (actions) {
		content = (
			<HStack>
				{content}
				{actions}
			</HStack>
		);
	}

	const classes = cx(
		styles.PanelHeader,
		seamless && styles.seamless,
		collapsible && styles.collapsibleHeader,
		!collapsible && styles.nonCollapsibleHeader,
		className,
	);

	if (!collapsible) {
		return (
			<Flex className={classes} {...otherProps} ref={forwardedRef}>
				<FlexBlock>{content}</FlexBlock>
			</Flex>
		);
	}

	return (
		<CollapsibleTrigger
			as={Flex}
			className={classes}
			{...otherProps}
			ref={forwardedRef}
		>
			{showArrow && (
				<Text isBlock>
					<ArrowIndicator direction={direction} size={5} width={5} />
				</Text>
			)}
			<FlexBlock>{content}</FlexBlock>
		</CollapsibleTrigger>
	);
}

export default contextConnect(PanelHeader, 'PanelHeader');
