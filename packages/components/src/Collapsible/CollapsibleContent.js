import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx, ui } from '@wp-g2/styles';
import React from 'react';
import { DisclosureContent } from 'reakit';

import { Animated } from '../animated';
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

function CollapsibleContent(props, forwardedRef) {
	const { children, className, ...otherProps } = useContextSystem(
		props,
		'CollapsibleContent',
	);
	const { disclosure } = useCollapsibleContext();

	const isVisible = disclosure?.visible;
	const classes = cx(styles.CollapsibleContent, className);

	return (
		<DisclosureContent
			className={classes}
			ref={forwardedRef}
			{...otherProps}
			{...disclosure}
		>
			<Animated
				animate={isVisible ? 'visible' : 'hidden'}
				className={cx(styles.innerContent)}
				initial={false}
				transition={{ duration: 0.2 }}
				variants={animationVariants}
				{...ui.$('CollapsibleInnerContent')}
			>
				{children}
			</Animated>
		</DisclosureContent>
	);
}

export default contextConnect(CollapsibleContent, 'CollapsibleContent');
