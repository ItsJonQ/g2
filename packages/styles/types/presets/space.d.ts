import { CSSClassName } from '../shared';

/** Calculates a value based on the grid system. */
export declare interface SpaceInterface {
	/**
	 * Calculates a value based on the grid system.
	 *
	 * @example
	 * ```js
	 * space(2);
	 * // 8px
	 * ```
	 */
	(value: number | string): CSSClassName;
}
