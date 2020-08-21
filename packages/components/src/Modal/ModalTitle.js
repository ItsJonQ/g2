import { connect } from '@wp-g2/context';
import React from 'react';

import { ModalTitleView } from './Modal.styles';

function ModalTitle({ children, ...props }) {
	if (!children) return null;

	return <ModalTitleView {...props}>{children}</ModalTitleView>;
}

export default connect(ModalTitle, 'ModalTitle');
