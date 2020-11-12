import { PolymorphicComponent } from './_shared';
import { GridProps } from './Grid';
import { TextProps } from './Text';

export declare type FormGroupProps = GridProps & {
	/**
	 * Aligns the label within `FormGroup`.
	 *
	 * @default 'left'
	 */
	alignLabel?: Pick<TextProps, 'align'>;
	/**
	 * Displays the label and form field horizontally.
	 *
	 * @default true
	 */
	horizontal?: boolean;
	/**
	 * Label of the form field.
	 */
	label?: string;
};

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
export declare const FormGroup: PolymorphicComponent<FormGroupProps>;
