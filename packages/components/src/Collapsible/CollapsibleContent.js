import { connect } from '@wp-g2/provider';
import React, { useRef } from 'react';
import { DisclosureContent } from 'reakit/Disclosure';

import {
	getAnimatedHeight,
	getAnimatedOpacity,
	useCollapsibleContext,
} from './Collapsible.utils';
import {
	CollapsibleContentView,
	InnerContentView,
} from './CollapsibleContent.styles';

function CollapsibleContent({ children, forwardedRef, ...props }) {
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

	const style = {
		height,
		opacity,
		transitionDuration: `${animationDuration}ms`,
		transitionTimingFunction: animationTimingFunction,
	};

	return (
		<DisclosureContent
			as={CollapsibleContentView}
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
