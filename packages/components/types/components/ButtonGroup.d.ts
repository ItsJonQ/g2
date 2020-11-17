import { RadioGroupProps as ReakitRadioGroupProps } from 'reakit';
import { PolymorphicComponent } from './_shared';

export declare type ButtonGroupProps = ReakitRadioGroupProps & {
	/**
	 * ID that will serve as a base for all the items IDs.
	 *
	 * @see https://reakit.io/docs/radio/#useradiostate
	 */
	baseId?: string;
	/**
	 * Determines if `Radio` is disabled.
	 */
	disabled?: boolean;
	/**
	 * Allows for value to reset if clicking the current active item.
	 */
	enableSelectNone?: boolean;
	/**
	 * Renders inner `Button` with a full-width expanded UI.
	 */
	expanded?: boolean;
	/**
	 * When an element is disabled, it may still be focusable. It works similarly to readOnly on form elements. In this case, only aria-disabled will be set.
	 *
	 * @see https://reakit.io/docs/radio/#radiogroup
	 */
	focusable?: boolean;
	/**
	 * Label for `Radio` components.
	 */
	label?: string;
	/**
	 * Callback when a `Button` `checked` value changes.
	 */
	onChange?: (...args: any) => void;
	/**
	 * Renders inner `Button` with a segmented UI.
	 */
	segmented?: boolean;
	/**
	 * Value of `Button`.
	 */
	value?: string | number;
};

/**
 * `ButtonGroup` is a form component contains and coordinates the checked state of multiple `Button` components.
 *
 * @example
 * ```jsx
 * import { ButtonGroup, Button } from `@wp-g2/components`;
 *
 * function Example() {
 *  return (
 *    <ButtonGroup value="ana">
 *      <Button value="ana">Ana</Button>
 *      <Button value="elsa">Elsa</Button>
 *      <Button value="kristoff">Kristoff</Button>
 *      <Button value="olaf">Olaf</Button>
 *    </ButtonGroup>
 *  );
 * }
 * ```
 */
export declare const ButtonGroup: PolymorphicComponent<ButtonGroupProps>;
