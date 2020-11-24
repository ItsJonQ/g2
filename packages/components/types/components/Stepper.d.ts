import { PolymorphicComponent, SizeRangeReduced } from './_shared';
import { ControlGroupProps } from './ControlGroup';

export declare type StepperDirection = 'horizontal' | 'vertical';

export declare type StepperProps = ControlGroupProps & {
	/**
	 * Renders `Button` controls vertically or horizontally.
	 *
	 * @default 'horizontal'
	 */
	direction?: StepperDirection;
	/**
	 * Renders inner control elements as (CSS) block elements.
	 *
	 * @default false
	 */
	isItemBlock?: boolean;
	/**
	 * Callback when `Stepper` is decremented.
	 */
	onDecrement?: (...args: any) => void;
	/**
	 * Callback when `Stepper` is incremented.
	 */
	onIncrement?: (...args: any) => void;
	/**
	 * Determines the size of `Stepper` `Button` elements.
	 *
	 * @default 'medium'
	 */
	size?: SizeRangeReduced;
};

/**
 * `Stepper` is a control component that lets users increment/decrement values.
 *
 * @example
 * ```jsx
 * <Stepper onIncrement={up} onDecrement={down} />
 * ```
 */
export declare const Stepper: PolymorphicComponent<'div', StepperProps>;
