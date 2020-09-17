import { DisclosureContent } from '@wp-g2/a11y';
import { connect, ns } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { Animated } from '../Animated';
import { useCollapsibleContext } from './Collapsible.Context';
import * as styles from './Collapsible.styles';

const animationVariants = {
	visible: {
		height: 'auto',
		opacity: 1,
		transitionEnd: {
			display: 'block',
		},
	},
	hidden: {
		height: 0,
		opacity: 0,
		transitionEnd: {
			display: 'none',
		},
	},
};

function CollapsibleContent({ children, className, forwardedRef, ...props }) {
	const { disclosure } = useCollapsibleContext();

	const isVisible = disclosure.visible;
	const classes = cx([styles.CollapsibleContent, className]);

	return (
		<DisclosureContent
			className={classes}
			ref={forwardedRef}
			{...props}
			{...disclosure}
		>
			<Animated
				animate={isVisible ? 'visible' : 'hidden'}
				className={cx([styles.innerContent])}
				initial={false}
				transition={{ duration: 0.2 }}
				variants={animationVariants}
				{...ns('CollapsibleInnerContent')}
			>
				{children}
			</Animated>
		</DisclosureContent>
	);
}

export default connect(CollapsibleContent, 'CollapsibleContent');
