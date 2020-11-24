import { contextConnect } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import { mergeRefs } from '@wp-g2/utils';
import React from 'react';

import { FlexItem } from '../Flex';
import { View } from '../View';
import SelectArrow from './SelectArrow';
import { useSelect } from './useSelect';

function SelectElement(props, forwardedRef) {
	const {
		as = 'select',
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
				as={as}
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

export default contextConnect(SelectElement, 'SelectElement');
