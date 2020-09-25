import {
	connectAndForwardRefComponent,
	ContextSystemProvider,
	hasNamespace,
	useContextSystem,
} from '@wp-g2/context';
import { useResponsiveValue } from '@wp-g2/styles';
import { getValidChildren } from '@wp-g2/utils';
import React, { Fragment } from 'react';

import { Divider } from '../Divider';
import { FlexBlock } from '../Flex';
import { VStack } from '../VStack';
import ListGroupContent from './ListGroupContent';

function ListGroup(props, forwardedRef) {
	const {
		children,
		separator = false,
		spacing,
		...otherProps
	} = useContextSystem(props, 'ListGroup');
	const validChildren = getValidChildren(children);
	const separatorValue = useResponsiveValue(separator);

	let headerComponent;
	let footerComponent;

	/**
	 * Shallowly adjusts child MenuItem components.
	 */
	const componentContextProps = React.useMemo(
		() => ({
			MenuItem: {
				isOffset: true,
				_shallow: true,
			},
		}),
		[],
	);

	/**
	 * Shallowly adjusts child Grid components.
	 */
	const gridContextProps = React.useMemo(
		() => ({
			Grid: {
				gap: 3,
				rowGap: 2,
				_shallow: true,
			},
		}),
		[],
	);

	/**
	 * We're scanning for potential ListGroupHeader and ListGroupFooter components.
	 * If found, they'll be hoisted (once) and removed from the children list.
	 * The Header and Footer components will be rendered in a different "slot"
	 * within ListGroup.
	 */
	const filteredChildren = validChildren.filter((child) => {
		const isGroupHeader = hasNamespace(child, ['ListGroupHeader']);
		if (isGroupHeader && !headerComponent) {
			// Hoist the ListGroupHeader
			headerComponent = child;
			return false;
		}

		const isGroupFooter = hasNamespace(child, ['ListGroupFooter']);
		if (isGroupFooter && !footerComponent) {
			// Hoist the ListGroupFooter
			footerComponent = child;
			return false;
		}
		return true;
	});

	const clonedChildren = filteredChildren.map((child, index) => {
		const isLast = index + 1 === filteredChildren.length;
		const isGrid = hasNamespace(child, ['Grid']);
		const _key = child.key || index;
		const showDivider = separatorValue && !isLast;

		let content = child;

		if (isGrid) {
			content = (
				<ContextSystemProvider value={gridContextProps}>
					{child}
				</ContextSystemProvider>
			);
		}

		return (
			<Fragment key={_key}>
				<FlexBlock>{content}</FlexBlock>
				{showDivider && (
					<FlexBlock>
						<Divider />
					</FlexBlock>
				)}
			</Fragment>
		);
	});

	return (
		<VStack {...otherProps} ref={forwardedRef} spacing={2}>
			{headerComponent}
			<ListGroupContent>
				<ContextSystemProvider value={componentContextProps}>
					<VStack
						autoWrap={false}
						spacing={separatorValue ? 0 : 2}
						{...{ spacing }}
					>
						{clonedChildren}
					</VStack>
				</ContextSystemProvider>
			</ListGroupContent>
			{footerComponent}
		</VStack>
	);
}

export default connectAndForwardRefComponent(ListGroup, 'ListGroup');
