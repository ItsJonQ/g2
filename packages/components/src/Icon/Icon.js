import { connect } from '@wp-g2/provider';
import { BaseView, css } from '@wp-g2/styles';
import React from 'react';

import * as styles from './Icon.styles';

function Icon({
	as = 'div',
	children,
	color,
	forwardedRef,
	icon,
	size = 20,
	...props
}) {
	if (!icon) return null;

	styles.color = css({
		color,
	});

	styles.size = css({
		height: size,
		width: size,
	});

	const IconComponent = React.cloneElement(icon, {
		height: size,
		ref: forwardedRef,
		size,
		width: size,
		...props,
	});

	const cx = [styles.Wrapper, styles.color, styles.size];

	return (
		<BaseView {...props} as={as} cx={cx}>
			{IconComponent}
		</BaseView>
	);
}

export default connect(Icon);
