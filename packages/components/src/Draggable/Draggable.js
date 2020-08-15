import { connect } from '@wp-g2/context';
import React from 'react';

import { DraggableView } from './Draggable.styles';
import * as styles from './Draggable.styles';

function Draggable({ ...props }) {
	return <DraggableView {...props} />;
}

export default connect(Draggable);
