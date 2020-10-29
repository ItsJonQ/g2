import { contextConnect, useContextSystem } from '@wp-g2/context';
import { useUniqueId } from '@wp-g2/utils';
import React from 'react';

import { Grid } from '../Grid';
import { View } from '../View';
import FormGroupContent from './FormGroupContent';

function FormGroup(props, forwardedRef) {
	const {
		alignLabel = 'left',
		children,
		help,
		horizontal = false,
		id: idProp,
		label,
		labelHidden = false,
		...otherProps
	} = useContextSystem(props, 'FormGroup');

	const id = useUniqueId(FormGroup, 'form-group', idProp);

	const contentProps = {
		alignLabel,
		children,
		help,
		id,
		horizontal,
		label,
		labelHidden,
	};

	if (horizontal) {
		return (
			<Grid
				templateColumns="minmax(0, 1fr) 2fr"
				{...otherProps}
				ref={forwardedRef}
			>
				<FormGroupContent {...contentProps} />
			</Grid>
		);
	}

	return (
		<View {...otherProps} ref={forwardedRef}>
			<FormGroupContent {...contentProps} />
		</View>
	);
}

export default contextConnect(FormGroup, 'FormGroup');
