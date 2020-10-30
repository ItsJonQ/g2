import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { BaseChoice, useBaseChoice } from '../BaseChoice';
import CheckboxElement from './CheckboxElement';

function Checkbox(props, forwardedRef) {
	const { baseChoice, ...otherProps } = useBaseChoice(props, 'Checkbox');

	return (
		<BaseChoice {...baseChoice}>
			<CheckboxElement {...otherProps} ref={forwardedRef} />
		</BaseChoice>
	);
}

export default contextConnect(Checkbox, 'Checkbox');
