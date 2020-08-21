import { connect } from '@wp-g2/context';
import { css, ui } from '@wp-g2/styles';
import React from 'react';

import { Icon } from '../Icon';
import { View } from '../View';
import * as styles from './ArrowIndicator.styles';
const { ArrowIndicatorView } = styles;

function ArrowIndicator({
	direction = 'right',
	height,
	iconSize = 5,
	size = 24,
	width,
	...props
}) {
	const rotations = {
		down: 90,
		left: 180,
		right: 0,
		up: 270,
	};
	const rotate = rotations[direction] || rotations.right;

	const cx = [
		css({ height: height || size, width: width || size }),
		ui.rotate(rotate),
		ui.animation.default,
	];

	return (
		<ArrowIndicatorView {...props} cx={cx}>
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

export default connect(ArrowIndicator, 'ArrowIndicator');
