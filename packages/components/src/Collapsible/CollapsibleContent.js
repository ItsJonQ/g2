import { connect } from '@wp-g2/provider';
import { cx } from '@wp-g2/styles';
import React, { useRef } from 'react';
import { DisclosureContent } from 'reakit/Disclosure';

import { InnerContentView } from './Collapsible.styles';
import * as styles from './Collapsible.styles';
import {
	getAnimatedHeight,
	getAnimatedOpacity,
	useCollapsibleContext,
} from './Collapsible.utils';

function CollapsibleContent({ children, className, forwardedRef, ...props }) {
	const innerRef = useRef();
	const {
		animatedState,
		animationDuration,
		animationTimingFunction,
		disclosure,
	} = useCollapsibleContext();

	const height = getAnimatedHeight({
		animatedState,
		height: innerRef.current?.clientHeight,
	});
	const opacity = getAnimatedOpacity({ animatedState });

	const classes = cx([styles.CollapsibleContent, className]);

	const style = {
		height,
		opacity,
		transitionDuration: `${animationDuration}ms`,
		transitionTimingFunction: animationTimingFunction,
	};

	return (
		<DisclosureContent
			className={classes}
			ref={forwardedRef}
			{...props}
			{...disclosure}
			style={style}
		>
			<InnerContentView ref={innerRef}>{children}</InnerContentView>
		</DisclosureContent>
	);
}

export default connect(CollapsibleContent);
