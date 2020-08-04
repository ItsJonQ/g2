import { connect } from '@wp-g2/provider';
import { css, get, highContrastMode } from '@wp-g2/styles';
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
	const isStandard = colorProp === 'standard';

	let background = isBold
		? get(`${lozengeColor}700`)
		: get(`${lozengeColor}100`);
	let color = isBold ? get('white') : get(`${lozengeColor}700`);
	let borderColor = get(`${lozengeColor}700`);

	if (isStandard) {
		background = isBold ? get(`darkGray300`) : get(`lightGray300`);
		color = isBold ? get('white') : get(`darkGray700`);
		borderColor = get(`darkGray300`);
	}

	styles.base = css({
		background,
		color,
		display,
	});

	styles.highContrast = highContrastMode(`
		box-shadow: 0 0 0 1px inset ${borderColor};
	`);

	const cx = [styles.base, styles.highContrast];

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
