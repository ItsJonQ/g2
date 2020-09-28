import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { DraggableView } from './Draggable.styles';

function Draggable(props, forwardedRef) {
	const { ...otherProps } = useContextSystem(props, 'Draggable');

	return <DraggableView {...otherProps} ref={forwardedRef} />;
}

export default contextConnect(Draggable, 'Draggable');
