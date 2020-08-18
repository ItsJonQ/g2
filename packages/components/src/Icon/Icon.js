import { connect } from '@wp-g2/context';
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
	const sx = {};

	sx.color = css({
		color,
	});

	sx.size = css({
		height: size,
		width: size,
	});

	const IconComponent = React.cloneElement(icon, {
		height: size,
		ref: forwardedRef,
		size,
		width: size,
	});

	const cx = [styles.Wrapper, sx.color, sx.size];

	return (
		<BaseView {...props} as={as} cx={cx}>
			{IconComponent}
		</BaseView>
	);
}

export default connect(Icon);
