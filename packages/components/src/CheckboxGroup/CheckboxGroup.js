import { useCheckboxState } from '@wp-g2/a11y/';
import { connect } from '@wp-g2/context';
import React from 'react';

import { CheckboxGroupContext } from './CheckboxGroup.Context';

function CheckboxGroup({ children, value }) {
	const checkbox = useCheckboxState({ state: value });
	const contextProps = {
		checkbox,
	};

	return (
		<CheckboxGroupContext.Provider value={contextProps}>
			{children}
		</CheckboxGroupContext.Provider>
	);
}

export default connect(CheckboxGroup, 'CheckboxGroup');
