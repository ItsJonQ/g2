import { Button as ReakitButton } from '@wp-g2/a11y';
import { connect, ns } from '@wp-g2/context';
import { FiChevronDown } from '@wp-g2/icons';
import { css, cx, ui } from '@wp-g2/styles';
import React from 'react';

import { useControlGroupContext } from '../ControlGroup';
import { Elevation } from '../Elevation';
import { Flex, FlexBlock, FlexItem } from '../Flex';
import { Icon } from '../Icon';
import * as styles from './BaseButton.styles';
import LoadingOverlay from './BaseButtonLoadingOverlay';

function BaseButton({
	children,
	className,
	css: cssProp,
	currentColor,
	disabled,
	elevation = 0,
	elevationActive,
	elevationFocus,
	elevationHover,
	forwardedRef,
	gap = 2,
	hasCaret = false,
	href,
	icon,
	iconSize = 16,
	isBlock = false,
	isControl = false,
	isDestructive = false,
	isLoading = false,
	isNarrow = false,
	isRounded = false,
	isSubtle = false,
	justify = 'center',
	prefix,
	size = 'medium',
	suffix,
	textAlign = 'center',
	variant = 'secondary',
	...props
}) {
	const as = href ? 'a' : 'button';
	const { styles: controlGroupStyles } = useControlGroupContext();
	const isIconOnly = !!icon && !children;

	const classes = cx([
		styles.Button,
		isBlock && styles.block,
		isDestructive && styles.destructive,
		isIconOnly && styles.icon,
		styles[variant],
		styles[size],
		isSubtle && styles.subtle,
		isControl && styles.control,
		isSubtle && isControl && styles.subtleControl,
		controlGroupStyles,
		isRounded && styles.rounded,
		isNarrow && styles.narrow,
		currentColor && styles.currentColor,
		css({ textAlign }),
		css(cssProp),
		className,
	]);

	return (
		<ReakitButton
			aria-busy={isLoading}
			as={as}
			className={classes}
			data-destructive={isDestructive}
			data-icon={!!icon}
			disabled={disabled || isLoading}
			href={href}
			{...props}
			ref={forwardedRef}
		>
			<LoadingOverlay isLoading={isLoading} />
			<Flex
				as="span"
				css={[ui.frame.height('100%')]}
				gap={gap}
				justify={justify}
			>
				{prefix && (
					<FlexItem
						as="span"
						className={cx([
							styles.PrefixSuffix,
							isLoading && styles.loading,
						])}
						{...ns('ButtonPrefix')}
					>
						{prefix}
					</FlexItem>
				)}
				{icon && (
					<FlexItem
						as="span"
						className={cx([
							styles.PrefixSuffix,
							isLoading && styles.loading,
						])}
						{...ns('ButtonIcon')}
					>
						<Icon icon={icon} size={iconSize} />
					</FlexItem>
				)}
				{children && (
					<FlexBlock
						as="span"
						className={cx([
							styles.Content,
							isLoading && styles.loading,
						])}
						{...ns('ButtonContent')}
					>
						{children}
					</FlexBlock>
				)}
				{suffix && (
					<FlexItem
						as="span"
						className={cx([
							styles.PrefixSuffix,
							isLoading && styles.loading,
						])}
						{...ns('ButtonSuffix')}
					>
						{suffix}
					</FlexItem>
				)}
				{hasCaret && (
					<FlexItem
						as="span"
						className={cx([
							styles.CaretWrapper,
							isLoading && styles.loading,
						])}
						{...ns('ButtonCaret')}
					>
						<Icon icon={<FiChevronDown />} size={16} />
					</FlexItem>
				)}
			</Flex>
			<Elevation
				active={elevationActive}
				as="span"
				focus={elevationFocus}
				hover={elevationHover}
				offset={-1}
				value={elevation}
				{...ns('ButtonElevation')}
			/>
		</ReakitButton>
	);
}

export default connect(BaseButton, 'BaseButton');
