import { connect } from '@wp-g2/context';
import React from 'react';

import * as styles from './FlatList.styles';
const { FlatListView } = styles;

function FlatList({ ...props }) {
	return <FlatListView {...props} />;
}

export default connect(FlatList, 'FlatList');
