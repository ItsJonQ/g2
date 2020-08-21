import { RadioGroup as ReakitRadioGroup, useRadioState } from '@wp-g2/a11y/';
import { connect } from '@wp-g2/context';
import React from 'react';

import { View } from '../View';
import { RadioGroupContext } from './RadioGroup.Context';

function RadioGroup({
	children,
	forwardedRef,
	label = 'RadioGroup',
	value,
	...props
}) {
	const radio = useRadioState({ state: value });
	const contextProps = {
		radio,
	};

	return (
		<RadioGroupContext.Provider value={contextProps}>
			<ReakitRadioGroup
				aria-label={label}
				as={View}
				ref={forwardedRef}
				{...props}
			>
				{children}
			</ReakitRadioGroup>
		</RadioGroupContext.Provider>
	);
}

export default connect(RadioGroup, 'RadioGroup');
