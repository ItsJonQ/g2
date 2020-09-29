import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, cx, ui } from '@wp-g2/styles';
import React from 'react';

import { Icon } from '../Icon';
import { View } from '../View';
import * as styles from './ArrowIndicator.styles';
const { ArrowIndicatorView } = styles;

function ArrowIndicator(props, forwardedRef) {
	const {
		direction = 'right',
		height,
		iconSize = 5,
		size = 24,
		width,
		...otherProps
	} = useContextSystem(props, 'ArrowIndicator');

	const rotations = {
		down: 90,
		left: 180,
		right: 0,
		up: 270,
	};
	const rotate = rotations[direction] || rotations.right;

	const __css = cx(
		css({ height: height || size, width: width || size }),
		ui.rotate(rotate),
		ui.animation.default,
	);

	return (
		<ArrowIndicatorView {...otherProps} cx={__css} ref={forwardedRef}>
			<View animate={{ rotate }}>
				<Icon
					icon={
						<svg
							fill="currentColor"
							height="24"
							viewBox="0 0 24 24"
							width="24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M21 12l-18 12v-24z" />
						</svg>
					}
					size={iconSize}
				/>
			</View>
		</ArrowIndicatorView>
	);
}

export default contextConnect(ArrowIndicator, 'ArrowIndicator');
