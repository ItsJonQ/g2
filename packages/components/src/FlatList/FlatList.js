import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import * as styles from './FlatList.styles';
const { FlatListView } = styles;

function FlatList(props, forwardedRef) {
	const { ...otherProps } = useContextSystem(props, 'FlatList');

	return <FlatListView {...otherProps} ref={forwardedRef} />;
}

export default contextConnect(FlatList, 'FlatList');
