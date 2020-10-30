import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { Grid } from '../Grid';
import { View } from '../View';
import FormGroupContent from './FormGroupContent';
import { useFormGroup } from './useFormGroup';

function FormGroup(props, forwardedRef) {
	const { contentProps, horizontal, ...otherProps } = useFormGroup(props);

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
