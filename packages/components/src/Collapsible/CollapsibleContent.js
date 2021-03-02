import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx, ui } from '@wp-g2/styles';
import React from 'react';
import { animated } from 'react-spring/web.cjs';
import { DisclosureContent } from 'reakit';

import { View } from '../View';
import { useCollapsibleContext } from './Collapsible.Context';
import * as styles from './Collapsible.styles';
import { useCollapsibleHeightAnimation } from './Collapsible.utils';

function CollapsibleContent(props, forwardedRef) {
	const { children, className, ...otherProps } = useContextSystem(
		props,
		'CollapsibleContent',
	);
	const { disclosure } = useCollapsibleContext();

	const isVisible = disclosure?.visible;
	const classes = cx(styles.CollapsibleContent, className);

	const [contentRef, animatedHeight] = useCollapsibleHeightAnimation({
		isVisible,
	});

	return (
		<DisclosureContent
			className={classes}
			ref={forwardedRef}
			{...otherProps}
			{...disclosure}
		>
			<View as={animated.div} ref={contentRef} style={animatedHeight}>
				<View
					className={styles.innerContent}
					{...ui.$('CollapsibleInnerContent')}
				>
					{children}
				</View>
			</View>
		</DisclosureContent>
	);
}

export default contextConnect(CollapsibleContent, 'CollapsibleContent');
