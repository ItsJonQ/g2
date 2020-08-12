import { MenuItem as ReakitMenuItem } from '@wp-g2/a11y';
import { connect } from '@wp-g2/context';
import { FiChevronLeft, FiChevronRight } from '@wp-g2/icons';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { Icon } from '../Icon';
import { View } from '../View';
import { useMenuContext } from './Menu.Context';
import * as styles from './Menu.styles';

function MenuItem({
	children,
	className,
	forwardedRef,
	isBack = false,
	showArrow = false,
	...props
}) {
	const { menu } = useMenuContext();
	const shouldShowArrow = !isBack && showArrow;

	const classes = cx([
		styles.MenuItem,
		shouldShowArrow && styles.showArrow,
		isBack && styles.showBackArrow,
		className,
	]);

	const Component = menu ? ReakitMenuItem : View;

	return (
		<Component {...props} {...menu} className={classes} ref={forwardedRef}>
			{isBack && (
				<View css={{ left: 8, position: 'absolute', top: 10 }}>
					<Icon icon={<FiChevronLeft />} size={12} />
				</View>
			)}
			{children}
			{shouldShowArrow && (
				<View css={{ position: 'absolute', right: 4, top: 8 }}>
					<Icon icon={<FiChevronRight />} size={16} />
				</View>
			)}
		</Component>
	);
}

export default connect(MenuItem);
