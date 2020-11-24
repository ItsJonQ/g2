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
 * 	<Checkbox label="Elsa" value="elsa" onChange={...} />
 * 	<Checkbox label="Ana" value="ana" onChange={...}  />
 * 	<Checkbox label="Olaf" value="olaf" onChange={...}  />
 * </CheckboxGroup>
 * ```
 */
export declare const CheckboxGroup: PolymorphicComponent<
	'div',
	CheckboxGroupProps
>;
