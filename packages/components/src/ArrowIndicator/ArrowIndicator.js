import { connect } from '@wp-g2/context';
import { css } from '@wp-g2/styles';
import React from 'react';

import { AnimatedView } from '../AnimatedView';
import { Icon } from '../Icon';
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
	const cx = [css({ height: height || size, width: width || size })];
	const rotations = {
		down: 90,
		left: 180,
		right: 0,
		up: 270,
	};
	const rotate = rotations[direction] || rotations.right;

	return (
		<ArrowIndicatorView {...props} cx={cx}>
			<AnimatedView animate={{ rotate }}>
				<Icon
					icon={
						<svg
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
			</AnimatedView>
		</ArrowIndicatorView>
	);
}

export default connect(ArrowIndicator);
