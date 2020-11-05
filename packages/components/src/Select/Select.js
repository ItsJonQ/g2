import { contextConnect } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import { mergeRefs } from '@wp-g2/utils';
import React from 'react';

import { FlexItem } from '../Flex';
import { View } from '../View';
import SelectArrow from './SelectArrow';
import { useSelect } from './useSelect';

function Select(props, forwardedRef) {
	const { inputProps, inputRef, prefix, suffix, ...otherProps } = useSelect(
		props,
	);

	return (
		<View {...otherProps}>
			{prefix && <FlexItem {...ui.$('SelectPrefix')}>{prefix}</FlexItem>}
			<View
				as="select"
				{...inputProps}
				ref={mergeRefs([forwardedRef, inputRef])}
			/>
			{suffix && <FlexItem {...ui.$('SelectSuffix')}>{suffix}</FlexItem>}
			<SelectArrow />
		</View>
	);
}

export default contextConnect(Select, 'Select');
