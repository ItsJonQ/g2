import { connect } from '@g2/provider';
import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Button as BaseButton } from 'reakit/Button';

import { Elevation } from '../Elevation';
import { Flex } from '../Flex';
import { Icon } from '../Icon';
import LoadingOverlay from './Button.LoadingOverlay';
import {
	ButtonView,
	CaretWrapperView,
	ContentView,
	PrefixSuffixView,
} from './Button.styles';

function Button({
	as = 'button',
	children,
	elevation = 0,
	elevationActive,
	elevationFocus,
	elevationHover,
	justify = 'center',
	gap = 2,
	hasCaret = false,
	href,
	isBlock = false,
	isDestructive = false,
	isLoading = false,
	isRounded = false,
	isNarrow = false,
	isOutline = false,
	prefix,
	suffix,
	forwardedRef,
	size = 'medium',
	variant = 'secondary',
	...props
}) {
	const componentTagName = href ? 'a' : as;

	return (
		<ButtonView
			__internal_baseComponent={BaseButton}
			aria-busy={isLoading}
			as={componentTagName}
			href={href}
			isBlock={isBlock}
			isOutline={isOutline}
			isRounded={isRounded}
			ref={forwardedRef}
			size={size}
			variant={variant}
			{...props}
		>
			<LoadingOverlay isLoading={isLoading} />
			<Flex as="span" gap={gap} justify={justify}>
				{prefix && (
					<PrefixSuffixView as="span" isLoading={isLoading}>
						{prefix}
					</PrefixSuffixView>
				)}
				<ContentView as="span" isLoading={isLoading}>
					{children}
				</ContentView>
				{suffix && (
					<PrefixSuffixView as="span" isLoading={isLoading}>
						{suffix}
					</PrefixSuffixView>
				)}
				{hasCaret && (
					<CaretWrapperView as="span" isLoading={isLoading}>
						<Icon icon={<FiChevronDown />} size={16} />
					</CaretWrapperView>
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
		</ButtonView>
	);
}

export default connect(Button);
