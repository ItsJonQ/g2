import * as React from 'react';
import { PolymorphicComponent, SizeRangeReduced } from './_shared';
import { BaseFieldProps } from './BaseField';

type TextInputArrow = 'stepper' | boolean;
type TextInputFormat = 'number' | 'type';

export declare type TextInputProps = Omit<
	BaseFieldProps,
	'isClickable' | 'isSubtle'
> & {
	/**
	 * For development only. Callback when a reducer action is dispatched.
	 */
	__debugger?: (action: any, nextValue: string, state: any) => void;
	/**
	 * Renders specified incrementer/decrementer arrows.
	 *
	 * @default true
	 */
	arrows?: TextInputArrow;
	/**
	 * Renders an error state.
	 *
	 * @default false
	 */
	error?: boolean;
	/**
	 * Modifies how `value` can be adjusted.
	 *
	 * @default 'text'
	 */
	format?: TextInputFormat;
	/**
	 * The amount of space between each child element.
	 *
	 * @default 2.5
	 */
	gap?: number;
	/**
	 * Renders a `cursor: pointer` on hover.
	 *
	 * @default false
	 */
	isClickable?: boolean;
	/**
	 * Fires the `onChange` callback after pressing `ENTER` or focusing away.
	 *
	 * @default 2.5
	 */
	isCommitOnBlurOrEnter?: boolean;
	/**
	 * Renders with rounded corners.
	 *
	 * @default false
	 */
	isRounded?: boolean;
	/**
	 * Enables larger `step` increment/decrement values when holding down `Shift`.
	 *
	 * @default true
	 */
	isShiftStepEnabled?: boolean;
	/**
	 * Allows for the a multiline `TextInput` to tbe resizable by dragging.
	 *
	 * @default false
	 */
	isResizable?: boolean;
	/**
	 * Renders a subtle `TextInput`.
	 *
	 * @default false
	 */
	isSubtle?: boolean;
	/**
	 * Maximum number of rows to show for a multiline `TextInput`.
	 */
	maxRows?: number;
	/**
	 * Alias for `rows`.
	 */
	minRows?: number;
	/**
	 * Renders `TextInput` to allow for multiline lines (`textarea`).
	 *
	 * @default false
	 */
	multiline?: boolean;
	/**
	 * Callback function when the `value` is committed.
	 */
	onChange?: (value: string) => void;
	/**
	 * Callback function when the height changes with a multiline `TextInput`.
	 */
	onHeightChange?: (height: number) => void;
	/**
	 * Callback function when the `value` changes.
	 */
	onValueChange?: (value: string) => void;
	/**
	 * Renders prefix content within `TextInput`.
	 */
	prefix?: React.ReactElement;
	/**
	 * Determines the size of `TextInput`.
	 */
	size?: SizeRangeReduced;
	/**
	 * Renders prefix content within `TextInput`.
	 */
	suffix?: React.ReactElement;
	/**
	 * Determines if the next `value` should be committed.
	 */
	validate?: (currentValue: string) => boolean;
};

/**
 * `TextInput` is a form component that users can enter content into.
 *
 * @example
 * ```jsx
 * import { TextInput } from `@wp-g2/components`
 *
 * function Example() {
 *   return <TextInput placeholder="First name" />
 * }
 * ```
 */
export declare const TextInput: PolymorphicComponent<'input', TextInputProps>;
