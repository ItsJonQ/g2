import { contextConnect, useContextSystem } from '@wp-g2/context';
import { View } from '@wp-g2/styles';
import React from 'react';

import * as styles from './Card.styles';

function CardInnerBody(props, forwardedRef) {
	const otherProps = useContextSystem(props, 'CardInnerBody');

	const __css = [styles.InnerBody];

	return <View {...otherProps} cx={__css} ref={forwardedRef} />;
}

export default contextConnect(CardInnerBody, 'CardInnerBody');
