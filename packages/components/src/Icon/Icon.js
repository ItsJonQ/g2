import { connect } from '@wp-g2/provider';
import React from 'react';

import { IconWrapper } from './Icon.styles';

function Icon({ forwardedRef, icon, size = 20, ...props }) {
	if (!icon) return null;

	const IconComponent = React.cloneElement(icon, {
		ref: forwardedRef,
		size,
		...props,
	});

	return <IconWrapper>{IconComponent}</IconWrapper>;
}

export default connect(Icon);
