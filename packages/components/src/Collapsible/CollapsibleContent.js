import { connect } from '@g2/provider';
import React from 'react';
import useMeasure from 'react-use-measure';
import { DisclosureContent } from 'reakit/Disclosure';

import { getAnimatedHeight, useCollapsibleContext } from './Collapsible.utils';
import {
	CollapsibleContentView,
	InnerContentView,
} from './CollapsibleContent.styles';

function CollapsibleContent({ children, forwardedRef, ...props }) {
	const [ref, bounds] = useMeasure();
	const {
		animatedState,
		animationDuration,
		animationTimingFunction,
		disclosure,
	} = useCollapsibleContext();

	const height = getAnimatedHeight({ animatedState, height: bounds.height });

	const style = {
		height,
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
			<InnerContentView ref={ref}>{children}</InnerContentView>
		</DisclosureContent>
	);
}

export default connect(CollapsibleContent);
