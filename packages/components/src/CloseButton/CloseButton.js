import { connect } from '@wp-g2/context';
import { FiX } from '@wp-g2/icons';
import React from 'react';

import { Button } from '../Button';

function CloseButton({ ...props }) {
	return (
		<Button icon={<FiX />} iconSize={12} variant="tertiary" {...props} />
	);
}

export default connect(CloseButton, 'CloseButton');
