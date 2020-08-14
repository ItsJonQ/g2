import { CSSClassName } from '../shared';

/** Modify background styles based on system presets. */
export declare interface BackgroundInterface {
	/** Applies custom background color. */
	(color: string): CSSClassName;
	/** Applies black background color. */
	black: CSSClassName;
	/** Applies white background color. */
	white: CSSClassName;
	/** Applies red background color. */
	red: CSSClassName;
	/** Applies blue background color. */
	blue: CSSClassName;
	/** Applies green background color. */
	green: CSSClassName;
	/** Applies yellow background color. */
	yellow: CSSClassName;
	/** Applies orange background color. */
	orange: CSSClassName;
	/** Applies purple background color. */
	purple: CSSClassName;
	/** Applies lightGray background color. */
	lightGray: CSSClassName;
	/** Applies darkGray background color. */
	darkGray: CSSClassName;
	/** Applies admin background color. */
	admin: CSSClassName;
}
