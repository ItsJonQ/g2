import { ComponentsProvider, connect, hasNamespace } from '@wp-g2/context';
import { getValidChildren } from '@wp-g2/utils';
import React, { Fragment } from 'react';

import { Divider } from '../Divider';
import { FlexBlock } from '../Flex';
import { VStack } from '../VStack';
import ListGroupContent from './ListGroupContent';

function ListGroup({ children, separator = false, spacing, ...props }) {
	const validChildren = getValidChildren(children);

	let headerComponent;
	let footerComponent;

	/**
	 * Shallowly adjusts child Grid components.
	 */
	const gridContextProps = {
		Grid: {
			gap: 3,
			rowGap: 2,
			_shallow: true,
		},
	};

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
		const showDivider = separator && !isLast;

		let content = child;

		if (isGrid) {
			content = (
				<ComponentsProvider value={gridContextProps}>
					{child}
				</ComponentsProvider>
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
		<VStack {...props} spacing={2}>
			{headerComponent}
			<ListGroupContent>
				<VStack
					autoWrap={false}
					spacing={separator ? 0 : 2}
					{...{ spacing }}
				>
					{clonedChildren}
				</VStack>
			</ListGroupContent>
			{footerComponent}
		</VStack>
	);
}

export default connect(ListGroup, 'ListGroup');
