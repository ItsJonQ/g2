import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { useResizeAware } from '@wp-g2/utils';
import React from 'react';

import { Card, CardBody } from '../Card';
import { Heading } from '../Heading';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { VStack } from '../VStack';
import { cardBodyStyles, iconStyles } from './BlankSlate.styles';

function BlankSlate(props, forwardedRef) {
	const {
		children,
		className,
		description,
		icon,
		title,
		...otherProps
	} = useContextSystem(props, 'BlankSlate');

	const [resizeListener, { width }] = useResizeAware();

	console.log(width);

	// Since `useResizeObserver` will report a width of `null` until after the
	// first render, avoid applying any modifier classes until width is known.
	let modifierClassNames;
	if (typeof width === 'number') {
		modifierClassNames = {
			'is-large': width >= 320,
			'is-medium': width >= 160 && width < 320,
			'is-small': width < 160,
		};
	}

	const classes = cx(className, modifierClassNames);

	return (
		<Card className={classes} {...otherProps} ref={forwardedRef}>
			{resizeListener}
			<CardBody className={cardBodyStyles}>
				<VStack>
					<Heading size={1}>
						<Icon className={iconStyles} icon={icon} inline />
						{title}
					</Heading>
					<Text>{description}</Text>
					{children}
				</VStack>
			</CardBody>
		</Card>
	);
}

export default contextConnect(BlankSlate, 'BlankSlate');