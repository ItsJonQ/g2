import { connect } from '@wp-g2/provider';
import { css, get, highContrastMode } from '@wp-g2/styles';
import { noop } from '@wp-g2/utils';
import React from 'react';

import { Text } from '../Text';
import * as styles from './Tag.styles';
import { TAG_COLORS } from './Tag.utils';
import TagRemoveButton from './TagRemoveButton';
const { TagView } = styles;

function Tag({
	children,
	color = 'standard',
	display = 'inline-flex',
	href,
	onRemove = { noop },
	removeButtonText,
	...props
}) {
	const tagColor = TAG_COLORS[color] || TAG_COLORS.standard;
	const background = tagColor.background;

	styles.base = css({
		background,
		color: tagColor.color,
		display,
	});

	styles.highContrast = highContrastMode(`
		box-shadow: 0 0 0 1px inset ${get('controlBorderColor')};
	`);

	const cx = [styles.base, styles.highContrast];

	const asProp = href ? 'a' : 'span';

	return (
		<TagView {...props} as={asProp} cx={cx} href={href}>
			<Text
				className={styles.text}
				color="currentColor"
				isBlock
				lineHeight={1}
				truncate
			>
				{children}
			</Text>
			<TagRemoveButton
				onClick={onRemove}
				removeButtonText={removeButtonText}
			/>
		</TagView>
	);
}

export default connect(Tag);
