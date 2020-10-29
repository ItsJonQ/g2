import React from 'react';

import { ControlLabel } from '../ControlLabel';
import { VisuallyHidden } from '../VisuallyHidden';

function FormGroupLabel({ children, id, labelHidden = false, ...props }) {
	if (!children) return null;

	if (labelHidden) {
		return (
			<VisuallyHidden as="label" htmlFor={id}>
				{children}
			</VisuallyHidden>
		);
	}

	return <ControlLabel {...props}>{children}</ControlLabel>;
}

export default React.memo(FormGroupLabel);
