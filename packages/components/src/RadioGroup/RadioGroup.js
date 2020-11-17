import { __ } from '@wordpress/i18n';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';
import { RadioGroup as ReakitRadioGroup, useRadioState } from 'reakit';

import { View } from '../View';
import { RadioGroupContext } from './RadioGroup.Context';

function RadioGroup(props, forwardedRef) {
	const {
		baseId,
		children,
		id,
		label = __('RadioGroup'),
		value,
		...otherProps
	} = useContextSystem(props, 'RadioGroup');

	const radio = useRadioState({ baseId: baseId || id, state: value });
	const contextProps = React.useMemo(
		() => ({
			radio,
		}),
		[radio],
	);

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
