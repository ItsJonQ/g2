import {
	PolymorphicComponent,
	FormElementProps,
	SizeRangeReduced,
} from './_shared';
import { BadgeProps } from './Badge';

export declare type SwitchSize = SizeRangeReduced;

export declare type SwitchProps = FormElementProps &
	Pick<BadgeProps, 'color' | 'display'> & {
		/**
		 * The checked (on/off) state of `Switch`.
		 */
		checked?: boolean;
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
 * <Switch checked={on} onChange={setOn} />
 * ```
 */
export declare const Switch: PolymorphicComponent<SwitchProps, 'input'>;
