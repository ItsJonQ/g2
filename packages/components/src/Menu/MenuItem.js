import { check, chevronLeft, chevronRight } from '@wordpress/icons';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { is, noop } from '@wp-g2/utils';
import React, { useCallback, useMemo } from 'react';
import { MenuItem as ReakitMenuItem } from 'reakit';

import { BaseButton } from '../base-button';
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
		closeOnClick = false,
		isBack = false,
		isOffset = false,
		isSelected,
		onClick = noop,
		prefix,
		showArrow = false,
		size,
		suffix,
		...otherProps
	} = useContextSystem(props, 'MenuItem');

	const { menu } = useMenuContext();
	const shouldShowArrow = !isBack && showArrow;

	const classes = cx(
		styles.MenuItem,
		styles[size],
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
					<Icon icon={chevronLeft} size={16} />
				</Text>
			),
		[isBack],
	);

	const nextArrow = useMemo(
		() =>
			shouldShowArrow && (
				<Text isBlock variant="muted">
					<Icon icon={chevronRight} size={16} />
				</Text>
			),
		[shouldShowArrow],
	);

	const selectedContent = useMemo(
		() =>
			is.defined(isSelected) && (
				<Icon
					icon={check}
					size={16}
					style={{ opacity: isSelected ? 1 : 0 }}
				/>
			),
		[isSelected],
	);

	const prefixContent = useMemo(() => {
		return (
			(prevArrow || prefix) && (
				<Flex>
					{prevArrow}
					{prefix}
				</Flex>
			)
		);
	}, [prefix, prevArrow]);

	const suffixContent = useMemo(() => {
		return (
			(selectedContent || nextArrow || suffix) && (
				<Flex>
					{selectedContent}
					{suffix}
					{nextArrow}
				</Flex>
			)
		);
	}, [nextArrow, selectedContent, suffix]);

	const handleOnClick = useCallback(
		(event) => {
			onClick(event);
			if (menu?.hide && closeOnClick) {
				menu.hide();
			}
		},
		[closeOnClick, menu, onClick],
	);

	return (
		<BaseButton
			as={Component}
			noWrap={false}
			{...otherProps}
			{...menu}
			className={classes}
			onClick={handleOnClick}
			prefix={prefixContent}
			ref={forwardedRef}
			size={size}
			suffix={suffixContent}
			textAlign="left"
		>
			{children}
		</BaseButton>
	);
}

export default contextConnect(MenuItem, 'MenuItem');
