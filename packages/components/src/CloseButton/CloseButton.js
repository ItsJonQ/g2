import { connect } from '@wp-g2/context';
import React from 'react';
import { FiX } from 'react-icons/fi';

import { Button } from '../Button';

function CloseButton({ ...props }) {
	return (
		<Button icon={<FiX />} iconSize={12} variant="tertiary" {...props} />
	);
}

export default connect(CloseButton);
