import { MenuItem as ReakitMenuItem } from '@wp-g2/a11y';
import { connect } from '@wp-g2/context';
import { FiChevronLeft, FiChevronRight } from '@wp-g2/icons';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { BaseButton } from '../BaseButton';
import { Flex } from '../Flex';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { View } from '../View';
import { useMenuContext } from './Menu.Context';
import * as styles from './Menu.styles';

function MenuItem({
	children,
	className,
	forwardedRef,
	isBack = false,
	isOffset = false,
	prefix,
	showArrow = false,
	suffix,
	...props
}) {
	const { menu } = useMenuContext();
	const shouldShowArrow = !isBack && showArrow;

	const classes = cx([
		styles.MenuItem,
		shouldShowArrow && styles.showArrow,
		isBack && styles.showBackArrow,
		isOffset && styles.offset,
		className,
	]);

	const Component = menu ? ReakitMenuItem : View;

	const prevArrow = isBack && (
		<Text isBlock variant="muted">
			<Icon icon={<FiChevronLeft />} size={16} />
		</Text>
	);
	const nextArrow = shouldShowArrow && (
		<Text isBlock variant="muted">
			<Icon icon={<FiChevronRight />} size={16} />
		</Text>
	);

	const prefixContent = (prevArrow || prefix) && (
		<Flex>
			{prevArrow}
			{prefix}
		</Flex>
	);

	const suffixContent = (nextArrow || suffix) && (
		<Flex>
			{suffix}
			{nextArrow}
		</Flex>
	);

	return (
		<BaseButton
			as={Component}
			noWrap={false}
			{...props}
			{...menu}
			className={classes}
			prefix={prefixContent}
			ref={forwardedRef}
			suffix={suffixContent}
			textAlign="left"
		>
			{children}
		</BaseButton>
	);
}

export default connect(MenuItem, 'MenuItem');
