import { connect } from '@wp-g2/provider';
import { BaseView, css } from '@wp-g2/styles';
import React from 'react';

import * as styles from './Icon.styles';

function Icon({ as = 'div', forwardedRef, icon, size = 20, ...props }) {
	if (!icon) return null;

	styles.Size = css({
		height: size,
		width: size,
	});

	const IconComponent = React.cloneElement(icon, {
		ref: forwardedRef,
		size,
		...props,
	});

	const cx = [styles.Wrapper, styles.Size];

	return (
		<BaseView {...props} as={as} cx={cx}>
			{IconComponent}
		</BaseView>
	);
}

export default connect(Icon);
