import { PolymorphicComponent, FormElementProps } from './_shared';
import { FlexProps } from './Flex';
import { GridProps } from './Grid';

export declare type CheckboxProps = FormElementProps &
	Pick<FlexProps, 'gap'> &
	Pick<GridProps, 'templateColumns'> & {
		/**
		 * The checked state for `Checkbox`.
		 */
		checked?: boolean;
		/**
		 * When an element is disabled, it may still be focusable. It works similarly to readOnly on form elements.
		 * In this case, only aria-disabled will be set.
		 *
		 * @see https://reakit.io/docs/checkbox/#checkbox
		 */
		focusable?: boolean;
		/**
		 * Form label for `Checkbox`.
		 */
		label?: string;
		/**
		 * Callback when `Checkbox` `checked` value changes.
		 */
		onChange?: (...args: any) => void;
		/**
		 * Checkbox's value is going to be used when multiple checkboxes share the same state.
		 * Checking a checkbox with value will add it to the state array.
		 *
		 * @see https://reakit.io/docs/checkbox/#checkbox
		 */
		value?: string | number;
	};

/**
 * `Checkbox` is a form component gives users a way to make a range of selections (zero, one, or multiple).
 *
 * @example
 * ```jsx
 * <Checkbox label="Olaf" value="olaf" checked={true} />
 * ```
 */
export declare const Checkbox: PolymorphicComponent<CheckboxProps, 'input'>;
