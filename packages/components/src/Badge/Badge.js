import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, cx } from '@wp-g2/styles';
import React from 'react';

import { Text } from '../Text';
import * as styles from './Badge.styles';
import { BADGE_COLORS } from './Badge.utils';

const { BadgeView } = styles;

function Badge(props, forwardedRef) {
	const {
		children,
		color: colorProp = 'standard',
		display = 'inline-flex',
		isBold = false,
		isRounded = false,
		truncate = true,
		...otherProps
	} = useContextSystem(props, 'Badge');

	const badgeColor = BADGE_COLORS[colorProp] || BADGE_COLORS.standard;
	const sx = {};

	sx.base = css({
		display,
	});

	const __css = cx([
		sx.base,
		truncate && styles.truncate,
		styles.getBackground({ color: badgeColor, isBold }),
		styles.getBackgroundText({ color: badgeColor, isBold }),
		isRounded && styles.rounded,
	]);

	return (
		<BadgeView {...otherProps} cx={__css} ref={forwardedRef}>
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

export default contextConnect(Badge, 'Badge');
