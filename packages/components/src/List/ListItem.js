import { connect } from '@wp-g2/context';
import React from 'react';

import * as styles from './List.styles';
const { ListItemView } = styles;

function ListItem({ ...props }) {
	return <ListItemView {...props} />;
}

export default connect(ListItem, 'ListItem');
