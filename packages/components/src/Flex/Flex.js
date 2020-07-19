import { connect, hasNamespace } from '@wp-g2/provider';
import { BaseView, css, cx } from '@wp-g2/system';
import { getValidChildren } from '@wp-g2/utils';
import React from 'react';

import * as styles from './Flex.styles';
import FlexItem from './FlexItem';

export function Flex({
	_autoWrap = true,
	align = 'center',
	children,
	direction,
	gap = 2,
	justify = 'space-between',
	...props
}) {
	styles.Base = css({
		alignItems: align,
		flexDirection: direction,
		justifyContent: justify,
	});

	const classes = [styles.Flex, styles.Base];
	const gapValue = gap * 4;

	const validChildren = getValidChildren(children);

	const clonedChildren = validChildren.map((child, index) => {
		const isColumn = direction === 'column';
		const isLast = index + 1 === validChildren.length;

		const _key = child.key || index;
		const _isFlexSubComponent = hasNamespace(child, [
			'FlexBlock',
			'FlexItem',
		]);

		const _child =
			!_isFlexSubComponent && _autoWrap ? (
				<FlexItem key={_key}>{child}</FlexItem>
			) : (
				child
			);

		const childProps = {
			display: isColumn ? 'block' : undefined,
		};

		let childClasses = childProps.className;

		if (!isLast) {
			if (isColumn) {
				childClasses = cx(
					css({ marginBottom: gapValue }),
					childClasses,
				);
			} else {
				childClasses = cx(css({ marginRight: gapValue }), childClasses);
			}
		}

		return React.cloneElement(_child, {
			...childProps,
			className: childClasses,
		});
	});

	return (
		<BaseView {...props} cx={classes}>
			{clonedChildren}
		</BaseView>
	);
}

export default connect(Flex);
