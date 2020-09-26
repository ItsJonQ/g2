import { contextConnect, useContextSystem } from '@wp-g2/context';
import { useUniqueId } from '@wp-g2/utils';
import React from 'react';

import { ControlLabel } from '../ControlLabel';
import { Grid } from '../Grid';
import { View } from '../View';
import { FormGroupContext } from './FormGroup.Context';

function FormGroup(props, forwardedRef) {
	const {
		alignLabel = 'left',
		children,
		horizontal = true,
		id: idProp,
		label,
		...otherProps
	} = useContextSystem(props, 'FormGroup');

	const id = useUniqueId(FormGroup, 'form-group', idProp);
	const contextProps = { id, horizontal };

	const labelMarkup = label ? (
		<ControlLabel align={alignLabel}>{label}</ControlLabel>
	) : null;

	const contentMarkup = (
		<FormGroupContext.Provider value={contextProps}>
			{labelMarkup}
			{children}
		</FormGroupContext.Provider>
	);

	if (horizontal) {
		return (
			<Grid
				templateColumns="minmax(0, 1fr) 2fr"
				{...otherProps}
				ref={forwardedRef}
			>
				{contentMarkup}
			</Grid>
		);
	}

	return (
		<View {...otherProps} ref={forwardedRef}>
			{contentMarkup}
		</View>
	);
}

export default contextConnect(FormGroup, 'FormGroup');
