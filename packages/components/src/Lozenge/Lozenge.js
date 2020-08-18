import { connect } from '@wp-g2/context';
import { css } from '@wp-g2/styles';
import React from 'react';

import { Text } from '../Text';
import * as styles from './Lozenge.styles';
import { LOZENGE_COLORS } from './Lozenge.utils';

const { LozengeView } = styles;

function Lozenge({
	children,
	color: colorProp = 'standard',
	display = 'inline-flex',
	isBold,
	...props
}) {
	const lozengeColor = LOZENGE_COLORS[colorProp] || LOZENGE_COLORS.standard;
	const sx = {};

	sx.base = css({
		display,
	});

	const cx = [
		sx.base,
		styles.getBackground({ color: lozengeColor, isBold }),
		styles.getBackgroundText({ color: lozengeColor, isBold }),
	];

	return (
		<LozengeView {...props} cx={cx}>
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
		</LozengeView>
	);
}

export default connect(Lozenge);
