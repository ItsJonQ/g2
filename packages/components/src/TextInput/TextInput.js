import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import BasicTextInput from './BasicTextInput';
import EnrichedTextInput from './EnrichedTextInput';

function TextInput(props, forwardedRef) {
	const { enriched = true, ...otherProps } = useContextSystem(
		props,
		'TextInput',
	);

	if (enriched) {
		return <EnrichedTextInput {...otherProps} ref={forwardedRef} />;
	} else {
		return <BasicTextInput {...otherProps} ref={forwardedRef} />;
	}
}

export default contextConnect(TextInput, 'TextInput');
