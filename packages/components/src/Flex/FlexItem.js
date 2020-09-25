import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, ui } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';
import * as styles from './Flex.styles';

function FlexItem(props, forwardedRef) {
	const {
		display: displayProp,
		isBlock = false,
		...otherProps
	} = useContextSystem(props, 'FlexItem');
	const sx = {};

	sx.Base = css({
		display: displayProp || ui.get('FlexItemDisplay'),
		marginBottom: ui.get('FlexItemMarginBottom'),
		marginLeft: ui.get('FlexItemMarginLeft'),
		marginRight: ui.get('FlexItemMarginRight'),
	});

	const __css = [styles.Item, sx.Base, isBlock && styles.block];

	return <View {...otherProps} cx={__css} ref={forwardedRef} />;
}

export default contextConnect(FlexItem, 'FlexItem');
