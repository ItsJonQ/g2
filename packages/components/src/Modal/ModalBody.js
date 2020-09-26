import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { CardBody } from '../Card';

const ModalBody = (props, forwardedRef) => {
	const otherProps = useContextSystem(props, 'ModalBody');

	return <CardBody {...otherProps} ref={forwardedRef} />;
};

export default contextConnect(ModalBody, 'ModalBody');
