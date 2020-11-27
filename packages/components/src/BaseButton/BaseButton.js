import { chevronDown } from '@wordpress/icons';
import { contextConnect } from '@wp-g2/context';
import { cx, ui } from '@wp-g2/styles';
import React from 'react';
import { Button as ReakitButton } from 'reakit';
import { Radio as ReakitRadio } from 'reakit';

import { useButtonGroupContext } from '../ButtonGroup';
import { Elevation } from '../Elevation';
import { FlexItem } from '../Flex';
import { Icon } from '../Icon';
import * as styles from './BaseButton.styles';
import LoadingOverlay from './BaseButtonLoadingOverlay';
import { useBaseButton } from './useBaseButton';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('./types').Props, 'button'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
function BaseButton(props, forwardedRef) {
	const {
		as: asProp,
		children,
		disabled = false,
		elevation = 0,
		elevationActive,
		elevationFocus,
		elevationHover,
		hasCaret = false,
		href,
		icon,
		iconSize = 16,
		isActive = false,
		isDestructive = false,
		isFocused = false,
		isLoading = false,
		noWrap = true,
		prefix,
		suffix,
		...otherProps
	} = useBaseButton(props);
	const { buttonGroup } = useButtonGroupContext();
	const buttonGroupState = buttonGroup || {};

	const BaseComponent = buttonGroup ? ReakitRadio : ReakitButton;
	const as = asProp || (href ? 'a' : 'button');

	return (
		// @ts-ignore No idea why TS is confused about this but ReakitRadio and ReakitButton are definitely renderable
		<BaseComponent
			aria-busy={isLoading}
			as={as}
			data-active={isActive}
			data-destructive={isDestructive}
			data-focused={isFocused}
			data-icon={!!icon}
			disabled={disabled || isLoading}
			href={href}
			{...buttonGroupState}
			{...otherProps}
			ref={forwardedRef}
		>
			<LoadingOverlay isLoading={isLoading} />
			{prefix && (
				<FlexItem
					as="span"
					className={cx(
						styles.PrefixSuffix,
						isLoading && styles.loading,
					)}
					{...ui.$('ButtonPrefix')}
				>
					{prefix}
				</FlexItem>
			)}
			{icon && (
				<FlexItem
					as="span"
					className={cx(
						styles.PrefixSuffix,
						isLoading && styles.loading,
					)}
					{...ui.$('ButtonIcon')}
				>
					<Icon icon={icon} size={iconSize} />
				</FlexItem>
			)}
			{children && (
				<FlexItem
					as="span"
					className={cx(
						styles.Content,
						isLoading && styles.loading,
						noWrap && styles.noWrap,
					)}
					isBlock
					{...ui.$('ButtonContent')}
				>
					{children}
				</FlexItem>
			)}
			{suffix && (
				<FlexItem
					as="span"
					className={cx(
						styles.PrefixSuffix,
						isLoading && styles.loading,
					)}
					{...ui.$('ButtonSuffix')}
				>
					{suffix}
				</FlexItem>
			)}
			{hasCaret && (
				<FlexItem
					as="span"
					className={cx(
						styles.CaretWrapper,
						isLoading && styles.loading,
					)}
					{...ui.$('ButtonCaret')}
				>
					<Icon icon={chevronDown} size={16} />
				</FlexItem>
			)}
			<Elevation
				active={elevationActive}
				as="span"
				focus={elevationFocus}
				hover={elevationHover}
				offset={-1}
				value={elevation}
				{...ui.$('ButtonElevation')}
			/>
		</BaseComponent>
	);
}

/**
 * `BaseButton` is a primitive component used to create actionable components (e.g. `Button`).
 */
const ConnectedBaseButton = contextConnect(BaseButton, 'BaseButton');

export default ConnectedBaseButton;
