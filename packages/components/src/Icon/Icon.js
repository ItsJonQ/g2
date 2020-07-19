import { connect } from '@wp-g2/provider';
import { css, system } from '@wp-g2/system';
import React from 'react';

import * as styles from './Icon.styles';

function Icon({ forwardedRef, icon, size = 20, ...props }) {
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
		<system.div cx={cx} {...props}>
			{IconComponent}
		</system.div>
	);
}

export default connect(Icon);
