import {
	connectAndForwardRefComponent,
	useContextSystem,
} from '@wp-g2/context';
import { css, ui } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';
import * as styles from './Flex.styles';

function FlexItem(componentProps, forwardedRef) {
	const {
		display: displayProp,
		isBlock = false,
		...props
	} = useContextSystem(componentProps, 'FlexItem');
	const sx = {};

	sx.Base = css({
		display: displayProp || ui.get('FlexItemDisplay'),
		marginBottom: ui.get('FlexItemMarginBottom'),
		marginLeft: ui.get('FlexItemMarginLeft'),
		marginRight: ui.get('FlexItemMarginRight'),
	});

	const __css = [styles.Item, sx.Base, isBlock && styles.block];

	return <View {...props} cx={__css} ref={forwardedRef} />;
}

export default connectAndForwardRefComponent(FlexItem, 'FlexItem');
