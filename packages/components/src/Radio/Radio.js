import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { BaseChoice, useBaseChoice } from '../base-choice';
import RadioElement from './RadioElement';

function Radio(props, forwardedRef) {
	const { baseChoice, ...otherProps } = useBaseChoice(props, 'Radio');

	return (
		<BaseChoice {...baseChoice}>
			<RadioElement {...otherProps} ref={forwardedRef} />
		</BaseChoice>
	);
}

export default contextConnect(Radio, 'Radio');
