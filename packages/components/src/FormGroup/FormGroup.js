import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { Grid } from '../Grid';
import { View } from '../View';
import FormGroupContent from './FormGroupContent';
import { useFormGroup } from './useFormGroup';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('./useFormGroup').Props, 'div'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
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

/**
 * `FormGroup` is a form component that groups a label with a form element (e.g. `Switch` or `TextInput`).
 *
 * @example
 * ```jsx
 * import { FormGroup, TextInput } from `@wp-g2/components`
 *
 * function Example() {
 * 	return (
 * 		<FormGroup label="First name">
 * 			<TextInput />
 * 		</FormGroup>
 * 	)
 * }
 * ```
 */
const ConnectedFormGroup = contextConnect(FormGroup, 'FormGroup');

export default ConnectedFormGroup;
