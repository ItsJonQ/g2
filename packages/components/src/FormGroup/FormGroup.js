import {
	connectAndForwardRefComponent,
	useContextSystem,
} from '@wp-g2/context';
import { useUniqueId } from '@wp-g2/utils';
import React from 'react';

import { ControlLabel } from '../ControlLabel';
import { Grid } from '../Grid';
import { View } from '../View';
import { FormGroupContext } from './FormGroup.Context';

function FormGroup(componentProps, forwardedRef) {
	const {
		alignLabel = 'left',
		children,
		horizontal = true,
		id: idProp,
		label,
		...props
	} = useContextSystem(componentProps, 'FormGroup');

	const id = useUniqueId(FormGroup, 'form-group', idProp);
	const contextProps = { id, horizontal };

	const labelMarkup = label ? (
		<ControlLabel align={alignLabel}>{label}</ControlLabel>
	) : null;

	const contentMarkup = (
		<>
			{labelMarkup}
			{children}
		</>
	);

	return (
		<FormGroupContext.Provider value={contextProps}>
			<View {...props} ref={forwardedRef}>
				{horizontal ? (
					<Grid templateColumns="minmax(0, 1fr) 2fr" {...props}>
						{contentMarkup}
					</Grid>
				) : (
					contentMarkup
				)}
			</View>
		</FormGroupContext.Provider>
	);
}

export default connectAndForwardRefComponent(FormGroup, 'FormGroup');
