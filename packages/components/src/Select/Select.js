import { contextConnect } from '@wp-g2/context';
import { css, cx, ui } from '@wp-g2/styles';
import { mergeRefs, useResizeAware } from '@wp-g2/utils';
import React from 'react';

import { FlexItem } from '../Flex';
import { View } from '../View';
import * as styles from './Select.styles';
import SelectArrow from './SelectArrow';
import { useSelect } from './useSelect';

function Select(props, forwardedRef) {
	const {
		inputProps,
		inputRef,
		multiple,
		prefix,
		resizer,
		sizes,
		suffix,
		suffixProps,
		...otherProps
	} = useSelect(props);

	return (
		<View {...otherProps}>
			{prefix && <FlexItem {...ui.$('SelectPrefix')}>{prefix}</FlexItem>}
			<View
				as="select"
				{...inputProps}
				ref={mergeRefs([forwardedRef, inputRef])}
			/>
			{suffix && (
				<FlexItem {...ui.$('SelectSuffix')} {...suffixProps}>
					{resizer}
					{suffix}
				</FlexItem>
			)}
			{!multiple && <SelectArrow />}
		</View>
	);
}

export default contextConnect(Select, 'Select');
