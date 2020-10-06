import { contextConnect } from '@wp-g2/context';
import { noop } from '@wp-g2/utils';
import { mergeRefs } from '@wp-g2/utils';
import React from 'react';

import BasicTextInput from './BasicTextInput';
import { useEnrichedTextInput } from './useTextInput';

function EnrichedTextInput(props, forwardedRef) {
	const {
		onChange = noop,
		isCommitOnBlurOrEnter = true,
		isShiftStepEnabled = true,
		validate,
		max = Infinity,
		min = -Infinity,
		shiftStep = 10,
		value,
		type = 'text',
		...otherProps
	} = props;

	const { inputRef, ...enrichedTextInputProps } = useEnrichedTextInput({
		...otherProps,
		isCommitOnBlurOrEnter,
		isShiftStepEnabled,
		max,
		min,
		onChange,
		shiftStep,
		type,
		validate,
		value,
	});

	return (
		<BasicTextInput
			{...otherProps}
			autoComplete="off"
			enriched={true}
			spellCheck={false}
			{...enrichedTextInputProps}
			ref={mergeRefs([inputRef, forwardedRef])}
		/>
	);
}

export default contextConnect(EnrichedTextInput, 'EnrichedTextInput');
