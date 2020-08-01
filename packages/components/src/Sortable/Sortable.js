import { connect } from '@wp-g2/provider';
import React from 'react';

import * as styles from './Sortable.styles';
const { SortableView } = styles;

function Sortable({ ...props }) {
	return <SortableView {...props} />;
}

export default connect(Sortable);
