import { RadioGroup as ReakitRadioGroup, useRadioState } from '@wp-g2/a11y/';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { View } from '../View';
import { RadioGroupContext } from './RadioGroup.Context';

function RadioGroup(props, forwardedRef) {
	const {
		baseId,
		children,
		id,
		label = 'RadioGroup',
		value,
		...otherProps
	} = useContextSystem(props, 'RadioGroup');

	const radio = useRadioState({ baseId: baseId || id, state: value });
	const contextProps = {
		radio,
	};

	return (
		<RadioGroupContext.Provider value={contextProps}>
			<ReakitRadioGroup
				aria-label={label}
				as={View}
				ref={forwardedRef}
				{...otherProps}
			>
				{children}
			</ReakitRadioGroup>
		</RadioGroupContext.Provider>
	);
}

export default contextConnect(RadioGroup, 'RadioGroup');
