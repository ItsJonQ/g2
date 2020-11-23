import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, cx } from '@wp-g2/styles';
import { noop } from '@wp-g2/utils';
import React from 'react';

import { Text } from '../Text';
import * as styles from './Tag.styles';
import { TAG_COLORS } from './Tag.utils';
import TagRemoveButton from './TagRemoveButton';
const { TagView } = styles;

function Tag(props, forwardedRef) {
	const {
		children,
		color = 'standard',
		display = 'inline-flex',
		href,
		onRemove = noop,
		removeButtonText,
		className,
		...otherProps
	} = useContextSystem(props, 'Tag');
	const tagColor = TAG_COLORS[color] || TAG_COLORS.standard;
	const sx = {};

	sx.base = css({
		display,
	});

	const classes = cx(
		sx.base,
		styles.getBackground({ color: tagColor }),
		styles.getBackgroundText({ color: tagColor }),
		className,
	);

	const asProp = href ? 'a' : 'span';

	return (
		<TagView
			{...otherProps}
			as={asProp}
			className={classes}
			href={href}
			ref={forwardedRef}
		>
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

export default contextConnect(Tag, 'Tag');
