import { connect } from '@wp-g2/context';
import { css, ns } from '@wp-g2/styles';
import { getValidChildren } from '@wp-g2/utils';
import React from 'react';

import { View } from '../View';
import * as styles from './ZStack.styles';
const { ZStackView } = styles;

function ZStack({
	children,
	isLayered = true,
	isReversed = false,
	offset = 0,
	...props
}) {
	const validChildren = getValidChildren(children);
	const childrenCount = validChildren.length - 1;

	const clonedChildren = validChildren.map((child, index) => {
		const zIndex = isReversed ? childrenCount - index : index;

		return (
			<View
				{...ns('ZStackItem')}
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

	const cx = [
		css({
			paddingLeft: !isLayered ? offset : null,
		}),
	];

	return (
		<ZStackView {...props} cx={cx}>
			{clonedChildren}
		</ZStackView>
	);
}

export default connect(ZStack);
