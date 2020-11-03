import {
	PolymorphicComponent,
	FormElementProps,
	SizeRangeReduced,
} from './_shared';

export declare type SwitchSize = SizeRangeReduced;

export declare type SwitchProps = FormElementProps & {
	/**
	 * The checked (on/off) state of `Switch`.
	 */
	checked?: boolean;
	/**
	 * Callback function when the `value` is changed.
	 */
	onChange?: (value: boolean) => void;
	/**
	 * Determines the size of `Switch`.
	 */
	size?: SwitchSize;
	/**
	 * Renders as a checkbox input or a radio input.
	 */
	type?: 'checkbox' | 'radio';
};

/**
 * `Switch` is a form component that toggles a checked (on/off) state.
 *
 * @example
 * ```jsx
 * import React from `react`;
 * import { Switch } from `@wp-g2/components`;
 *
 * function Example() {
 * 	 const [on, setOn] = React.useState(true);
 *
 *   return <Switch checked={on} onChange={setOn} />
 * }
 * ```
 */
export declare const Switch: PolymorphicComponent<SwitchProps, 'input'>;
