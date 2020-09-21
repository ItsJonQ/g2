import { PolymorphicComponent } from './_shared';
import { FlexProps } from './Flex';
import { GridProps } from './Grid';

export declare type RadioGroupProps = Pick<FlexProps, 'gap'> &
	Pick<GridProps, 'templateColumns'> & {
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
		 * Callback when a `Radio` `checked` value changes.
		 */
		onChange?: (...args: any) => void;
		/**
		 * Value of `Radio`.
		 */
		value?: string | number;
	};

/**
 * `RadioGroup` is a form component contains and coordinates the checked state of multiple `Radio` components.
 *
 * @example
 * ```jsx
 * <RadioGroup value={value} onChange={setValue}>
 * 	<HStack>
 * 		<Radio label="Ana" value="ana" />
 * 		<Radio label="Elsa" value="elsa" />
 * 		<Radio label="Olaf" value="olaf" />
 * 	</HStack>
 * </RadioGroup>
 * ```
 */
export declare const RadioGroup: PolymorphicComponent<RadioGroupProps>;
