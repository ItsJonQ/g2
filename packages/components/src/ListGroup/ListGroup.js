import {
	contextConnect,
	ContextSystemProvider,
	hasNamespace,
	useContextSystem,
} from '@wp-g2/context';
import { useResponsiveValue } from '@wp-g2/styles';
import { getValidChildren } from '@wp-g2/utils';
import React, { Fragment } from 'react';

import { Divider } from '../Divider';
import { View } from '../View';
import { useVStack } from '../VStack';
import ListGroupContent from './ListGroupContent';

/**
 * Shallowly adjusts child MenuItem components.
 */
const listGroupContextProps = {
	MenuItem: {
		isOffset: true,
	},
};

/**
 * Shallowly adjusts child Grid components.
 */
const listGroupGridContextProps = {
	Grid: {
		gap: 3,
		rowGap: 2,
	},
};

function ListGroup(props, forwardedRef) {
	const {
		children,
		separator = false,
		spacing = 2,
		...otherProps
	} = useContextSystem(props, 'ListGroup');
	const vStackProps = useVStack({ spacing, ...otherProps });

	const validChildren = getValidChildren(children);
	const separatorValue = useResponsiveValue(separator);

	let headerComponent;
	let footerComponent;

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
				<ContextSystemProvider value={listGroupGridContextProps}>
					{child}
				</ContextSystemProvider>
			);
		}

		return (
			<Fragment key={_key}>
				{content}
				{showDivider && <Divider />}
			</Fragment>
		);
	});

	return (
		<View {...vStackProps} ref={forwardedRef}>
			{headerComponent}
			<ListGroupContent spacing={separatorValue ? 0 : 2} {...{ spacing }}>
				<ContextSystemProvider value={listGroupContextProps}>
					{clonedChildren}
				</ContextSystemProvider>
			</ListGroupContent>
			{footerComponent}
		</View>
	);
}

export default contextConnect(ListGroup, 'ListGroup');
