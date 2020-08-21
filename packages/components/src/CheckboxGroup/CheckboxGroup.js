import { useCheckboxState } from '@wp-g2/a11y/';
import { connect } from '@wp-g2/context';
import React from 'react';

import { CheckboxGroupContext } from './CheckboxGroup.Context';

function CheckboxGroup({
	children,
	forwardedRef,
	label = 'CheckboxGroup',
	value,
	...props
}) {
	const radio = useCheckboxState({ state: value });
	const contextProps = {
		radio,
	};

	return (
		<CheckboxGroupContext.Provider value={contextProps}>
			{children}
		</CheckboxGroupContext.Provider>
	);
}

export default connect(CheckboxGroup, 'CheckboxGroup');
