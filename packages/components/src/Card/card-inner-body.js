import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';
import * as styles from './card-styles';

function CardInnerBody(props, forwardedRef) {
	const otherProps = useContextSystem(props, 'CardInnerBody');

	const __css = cx(styles.InnerBody);

	return <View {...otherProps} cx={__css} ref={forwardedRef} />;
}

export default contextConnect(CardInnerBody, 'CardInnerBody');
