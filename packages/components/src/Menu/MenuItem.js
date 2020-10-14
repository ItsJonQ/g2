import { MenuItem as ReakitMenuItem } from '@wp-g2/a11y';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { FiCheck, FiChevronLeft, FiChevronRight } from '@wp-g2/icons';
import { cx } from '@wp-g2/styles';
import { is } from '@wp-g2/utils';
import React, { useMemo } from 'react';

import { BaseButton } from '../BaseButton';
import { Flex } from '../Flex';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { View } from '../View';
import { useMenuContext } from './Menu.Context';
import * as styles from './Menu.styles';

function MenuItem(props, forwardedRef) {
	const {
		children,
		className,
		isBack = false,
		isOffset = false,
		isSelected,
		prefix,
		showArrow = false,
		suffix,
		...otherProps
	} = useContextSystem(props, 'MenuItem');

	const { menu } = useMenuContext();
	const shouldShowArrow = !isBack && showArrow;

	const classes = cx(
		styles.MenuItem,
		shouldShowArrow && styles.showArrow,
		isBack && styles.showBackArrow,
		isOffset && styles.offset,
		className,
	);

	const Component = menu ? ReakitMenuItem : View;

	const prevArrow = useMemo(
		() =>
			isBack && (
				<Text isBlock variant="muted">
					<Icon icon={<FiChevronLeft />} size={16} />
				</Text>
			),
		[isBack],
	);

	const nextArrow = useMemo(
		() =>
			shouldShowArrow && (
				<Text isBlock variant="muted">
					<Icon icon={<FiChevronRight />} size={16} />
				</Text>
			),
		[shouldShowArrow],
	);

	const selectedContent = useMemo(
		() =>
			is.defined(isSelected) && (
				<Text isBlock>
					<Icon
						icon={<FiCheck />}
						size={16}
						style={{ opacity: isSelected ? 1 : 0 }}
					/>
				</Text>
			),
		[isSelected],
	);

	const prefixContent = useMemo(() => {
		return (
			(selectedContent || prevArrow || prefix) && (
				<Flex>
					{selectedContent}
					{prevArrow}
					{prefix}
				</Flex>
			)
		);
	}, [prefix, prevArrow, selectedContent]);

	const suffixContent = useMemo(() => {
		return (
			(nextArrow || suffix) && (
				<Flex>
					{suffix}
					{nextArrow}
				</Flex>
			)
		);
	}, [nextArrow, suffix]);

	return (
		<BaseButton
			as={Component}
			noWrap={false}
			{...otherProps}
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

export default contextConnect(MenuItem, 'MenuItem');
