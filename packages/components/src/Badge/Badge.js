import { connect } from '@wp-g2/context';
import { css } from '@wp-g2/styles';
import React from 'react';

import { Text } from '../Text';
import * as styles from './Badge.styles';
import { BADGE_COLORS } from './Badge.utils';

const { BadgeView } = styles;

function Badge({
	children,
	color: colorProp = 'standard',
	display = 'inline-flex',
	isBold,
	isRounded,
	truncate = true,
	...props
}) {
	const badgeColor = BADGE_COLORS[colorProp] || BADGE_COLORS.standard;
	const sx = {};

	sx.base = css({
		display,
	});

	const cx = [
		sx.base,
		truncate && styles.truncate,
		styles.getBackground({ color: badgeColor, isBold }),
		styles.getBackgroundText({ color: badgeColor, isBold }),
		isRounded && styles.rounded,
	];

	return (
		<BadgeView {...props} cx={cx}>
			<Text
				className={styles.text}
				color="currentColor"
				isBlock
				lineHeight={1}
				size={10}
				truncate
				upperCase
				weight={700}
			>
				{children}
			</Text>
		</BadgeView>
	);
}

export default connect(Badge, 'Badge');
