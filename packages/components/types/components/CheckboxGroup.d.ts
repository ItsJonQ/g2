import { PolymorphicComponent } from './_shared';

export declare type CheckboxGroupProps = {
	/**
	 * Checkbox's value is going to be used when multiple checkboxes share the same state.
	 * Checking a checkbox with value will add it to the state array.
	 *
	 * @see https://reakit.io/docs/checkbox/#checkbox
	 */
	value?: string | number;
};

/**
 * `CheckboxGroup` is a form component contains and coordinates the checked state of multiple `Checkbox` components.
 *
 * @example
 * ```jsx
 * <CheckboxGroup>
 * 	<Checkbox label="Elsa" value="elsa" />
 * 	<Checkbox label="Ana" value="ana" />
 * 	<Checkbox label="Olaf" value="olaf" />
 * </CheckboxGroup>
 * ```
 */
export declare const CheckboxGroup: PolymorphicComponent<CheckboxGroupProps>;
