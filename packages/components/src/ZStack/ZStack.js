import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, ui } from '@wp-g2/styles';
import { getValidChildren } from '@wp-g2/utils';
import React from 'react';

import { View } from '../View';
import * as styles from './ZStack.styles';
const { ZStackView } = styles;

function ZStack(props, forwardedRef) {
	const {
		children,
		isLayered = true,
		isReversed = false,
		offset = 0,
		...otherProps
	} = useContextSystem(props, 'ZStack');

	const validChildren = getValidChildren(children);
	const childrenCount = validChildren.length - 1;

	const clonedChildren = validChildren.map((child, index) => {
		const zIndex = isReversed ? childrenCount - index : index;

		return (
			<View
				{...ui.$('ZStackItem')}
				cx={[
					isLayered
						? styles.positionAbsolute
						: styles.positionRelative,
					css({
						marginLeft: !isLayered && offset * -1,
					}),
				]}
				key={child.key}
				style={{
					zIndex,
				}}
			>
				{child}
			</View>
		);
	});

	const __css = [
		css({
			paddingLeft: !isLayered ? offset : null,
		}),
	];

	return (
		<ZStackView {...otherProps} cx={__css} ref={forwardedRef}>
			{clonedChildren}
		</ZStackView>
	);
}

export default contextConnect(ZStack, 'ZStack');
