import { PolymorphicComponent, FormElementProps } from './_shared';
import { FlexProps } from './Flex';
import { GridProps } from './Grid';

export declare type RadioProps = FormElementProps &
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
		 * Value of `Radio`.
		 */
		value?: string | number;
	};

/**
 * `Radio` is a form component gives users a way to make a single selection.
 */
export declare const Radio: PolymorphicComponent<RadioProps, 'input'>;
