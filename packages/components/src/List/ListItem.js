import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import * as styles from './List.styles';
const { ListItemView } = styles;

function ListItem(props, forwardedRef) {
	const { ...otherProps } = useContextSystem(props, 'ListItem');

	return <ListItemView {...otherProps} ref={forwardedRef} />;
}

export default contextConnect(ListItem, 'ListItem');
