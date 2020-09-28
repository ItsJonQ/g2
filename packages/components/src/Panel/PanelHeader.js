import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { ArrowIndicator } from '../ArrowIndicator';
import { CollapsibleTrigger, useCollapsibleContext } from '../Collapsible';
import { Flex, FlexBlock } from '../Flex';
import { Text } from '../Text';
import { usePanelContext } from './Panel.Context';
import * as styles from './Panel.styles';

function PanelHeader(props, forwardedRef) {
	const { children, className, title, ...otherProps } = useContextSystem(
		props,
		'PanelHeader',
	);
	const { disclosure } = useCollapsibleContext();
	const { isSeamless } = usePanelContext();
	const { visible } = disclosure;

	const content = title ? <Text weight={500}>{title}</Text> : children;
	const direction = visible ? 'down' : 'right';

	const classes = cx([
		styles.PanelHeader,
		isSeamless && styles.seamless,
		className,
	]);

	return (
		<CollapsibleTrigger
			as={Flex}
			className={classes}
			{...otherProps}
			ref={forwardedRef}
		>
			<Text isBlock>
				<ArrowIndicator direction={direction} size={5} width={5} />
			</Text>
			<FlexBlock>{content}</FlexBlock>
		</CollapsibleTrigger>
	);
}

export default contextConnect(PanelHeader, 'PanelHeader');
