import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';
import { useCheckboxState } from 'reakit';

import { CheckboxGroupContext } from './CheckboxGroup.Context';

function CheckboxGroup(props, forwardedRef) {
	const { children, value } = useContextSystem(props, 'CheckboxGroup');
	const checkbox = useCheckboxState({ state: value });
	const contextProps = React.useMemo(
		() => ({
			checkbox,
		}),
		[checkbox],
	);

	return (
		<CheckboxGroupContext.Provider ref={forwardedRef} value={contextProps}>
			{children}
		</CheckboxGroupContext.Provider>
	);
}

export default contextConnect(CheckboxGroup, 'CheckboxGroup');
