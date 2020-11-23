import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, cx, ui } from '@wp-g2/styles';
import { getValidChildren } from '@wp-g2/utils';
import React from 'react';

import { View } from '../View';
import * as styles from './ZStack.styles';
const { ZStackView } = styles;

function ZStack(props, forwardedRef) {
	const {
		children,
		className,
		isLayered = true,
		isReversed = false,
		offset = 0,
		...otherProps
	} = useContextSystem(props, 'ZStack');

	const validChildren = getValidChildren(children);
	const childrenCount = validChildren.length - 1;

	const clonedChildren = validChildren.map((child, index) => {
		const zIndex = isReversed ? childrenCount - index : index;

		const classes = cx(
			isLayered ? styles.positionAbsolute : styles.positionRelative,
			css({
				marginLeft: !isLayered && offset * -1,
			}),
		);

		return (
			<View
				{...ui.$('ZStackItem')}
				className={classes}
				key={child.key}
				style={{
					zIndex,
				}}
			>
				{child}
			</View>
		);
	});

	const classes = cx(
		css({
			paddingLeft: !isLayered ? offset : null,
		}),
		className,
	);

	return (
		<ZStackView {...otherProps} className={classes} ref={forwardedRef}>
			{clonedChildren}
		</ZStackView>
	);
}

export default contextConnect(ZStack, 'ZStack');
