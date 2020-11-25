import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { getValidChildren } from '@wp-g2/utils';
import React from 'react';

import { ControlGroupContext } from './ControlGroup.Context';
import * as styles from './ControlGroup.styles';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('./types').Props, 'div'>} props
 */
export function useControlGroup(props) {
	const {
		children,
		className,
		direction = 'row',
		templateColumns,
		...otherProps
	} = useContextSystem(props, 'ControlGroup');

	const validChildren = getValidChildren(children);
	const isVertical = direction === 'column';
	const isGrid = !!templateColumns;

	const classes = cx(styles.itemFocus, isGrid && styles.itemGrid, className);

	const clonedChildren =
		validChildren &&
		validChildren.map((child, index) => {
			const isFirst = index === 0;
			const isLast = index + 1 === validChildren.length;
			const isOnly = isFirst && isLast;
			const isMiddle = !isFirst && !isLast;

			// @ts-ignore
			const _key = child?.key || index;

			const contextStyles = cx(
				isFirst
					? isVertical
						? styles.firstRow
						: styles.first
					: undefined,
				isMiddle && styles.middle,
				isLast
					? isVertical
						? styles.lastRow
						: styles.last
					: undefined,
			);

			const contextProps = {
				isFirst,
				isLast,
				isMiddle,
				isOnly,
				isVertical,
				styles: contextStyles,
			};

			return (
				<ControlGroupContext.Provider key={_key} value={contextProps}>
					{child}
				</ControlGroupContext.Provider>
			);
		});

	return {
		...otherProps,
		children: clonedChildren,
		className: classes,
		direction,
		templateColumns,
	};
}
