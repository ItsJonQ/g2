import { CSS, PolymorphicComponent } from './_shared';

export declare type SpinnerProps = {
	/**
	 * Color of `Spinner`.
	 */
	color?: CSS['color'];
	/**
	 * Size of `Spinner`.
	 *
	 * @default 16
	 */
	size?: number;
};

/**
 * `Spinner` is a component that notifies users that an action is being processed.
 *
 * @example
 * ```jsx
 * <Spinner />
 * ```
 */
export declare const Spinner: PolymorphicComponent<SpinnerProps>;
