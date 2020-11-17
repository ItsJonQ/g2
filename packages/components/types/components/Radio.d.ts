import { RadioProps as ReakitRadioProps } from 'reakit';
import { PolymorphicComponent, FormElementProps } from './_shared';
import { ControlLabelProps } from './ControlLabel';
import { FlexProps } from './Flex';
import { GridProps } from './Grid';

export declare type RadioProps = ReakitRadioProps &
	FormElementProps &
	Pick<ControlLabelProps, 'truncate'> &
	Pick<FlexProps, 'gap'> &
	Pick<GridProps, 'templateColumns'> & {
		/**
		 * The checked state for `Radio`.
		 */
		checked?: boolean;
		/**
		 * When an element is disabled, it may still be focusable. It works similarly to readOnly on form elements.
		 * In this case, only aria-disabled will be set.
		 *
		 * @see https://reakit.io/docs/radio/#radio
		 */
		focusable?: boolean;
		/**
		 * Form label for `Radio`.
		 */
		label?: string;
		/**
		 * Callback when `Radio` `checked` value changes.
		 */
		onChange?: (...args: any) => void;
		/**
		 * Value of `Radio`.
		 */
		value?: string | number;
	};

/**
 * `Radio` is a form component gives users a way to make a single selection.
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
export declare const Radio: PolymorphicComponent<RadioProps, 'input'>;
