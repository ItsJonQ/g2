import { connect } from '@wp-g2/provider';
import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Button as BaseButton } from 'reakit/Button';

import { useControlGroupContext } from '../ControlGroup';
import { Elevation } from '../Elevation';
import { Flex } from '../Flex';
import { Icon } from '../Icon';
import LoadingOverlay from './Button.LoadingOverlay';
import {
	ButtonLinkView,
	ButtonView,
	CaretWrapperView,
	ContentView,
	PrefixSuffixView,
} from './Button.styles';

function Button({
	children,
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
	isNarrow = false,
	isRounded = false,
	isSubtle = false,
	justify = 'center',
	prefix,
	size = 'medium',
	suffix,
	variant = 'secondary',
	...props
}) {
	const as = href ? ButtonLinkView : ButtonView;
	const { isFirst, isLast, isMiddle } = useControlGroupContext();

	return (
		<BaseButton
			aria-busy={isLoading}
			as={as}
			href={href}
			isBlock={isBlock}
			isDestructive={isDestructive}
			isFirst={isFirst}
			isLast={isLast}
			isMiddle={isMiddle}
			isRounded={isRounded}
			isSubtle={isSubtle}
			ref={forwardedRef}
			size={size}
			variant={variant}
			{...props}
		>
			<LoadingOverlay isLoading={isLoading} />
			<Flex as="span" gap={gap} justify={justify} sx={{ width: '100%' }}>
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
		</BaseButton>
	);
}

export default connect(Button, 'Button');
