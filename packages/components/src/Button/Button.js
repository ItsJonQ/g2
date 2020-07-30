import { connect } from '@wp-g2/provider';
import { cx } from '@wp-g2/styles';
import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Button as BaseButton } from 'reakit/Button';

import { useControlGroupContext } from '../ControlGroup';
import { Elevation } from '../Elevation';
import { Flex, FlexBlock, FlexItem } from '../Flex';
import { Icon } from '../Icon';
import * as styles from './Button.styles';
import LoadingOverlay from './ButtonLoadingOverlay';

function Button({
	children,
	className,
	elevation = 0,
	elevationActive,
	elevationFocus,
	elevationHover,
	forwardedRef,
	gap = 2,
	hasCaret = false,
	href,
	isBlock = false,
	isDestructive = false,
	isLoading = false,
	isRounded = false,
	isSubtle = false,
	justify = 'center',
	prefix,
	size = 'medium',
	suffix,
	variant = 'secondary',
	...props
}) {
	const as = href ? 'a' : 'button';
	const { styles: controlGroupStyles } = useControlGroupContext();

	const classes = cx([
		styles.Button,
		isBlock && styles.block,
		isDestructive && styles.destructive,
		isRounded && styles.rounded,
		isSubtle && styles.subtle,
		styles[variant],
		styles[size],
		controlGroupStyles,
	]);

	return (
		<BaseButton
			aria-busy={isLoading}
			as={as}
			className={classes}
			data-destructive={isDestructive}
			href={href}
			ref={forwardedRef}
			{...props}
		>
			<LoadingOverlay isLoading={isLoading} />
			<Flex as="span" gap={gap} justify={justify}>
				{prefix && (
					<FlexItem
						as="span"
						className={cx([
							styles.PrefixSuffix,
							isLoading && styles.loading,
						])}
					>
						{prefix}
					</FlexItem>
				)}
				<FlexBlock
					as="span"
					className={cx([
						styles.Content,
						isLoading && styles.loading,
					])}
				>
					{children}
				</FlexBlock>
				{suffix && (
					<FlexItem
						as="span"
						className={cx([
							styles.PrefixSuffix,
							isLoading && styles.loading,
						])}
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
			/>
		</BaseButton>
	);
}

export default connect(Button, 'Button');
