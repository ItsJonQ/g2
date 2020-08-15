import { CSSClassName } from '../shared';

/** Modify position styles based on system presets. */
export declare interface PositionInterface {
	/** Aligns content to full size of the parent element. */
	full: CSSClassName;
	/** Allows for content to position to. */
	relative: CSSClassName;
	/** Applies content to the top. */
	top: CSSClassName;
	/** Applies content to the bottom. */
	bottom: CSSClassName;
	/** Applies content to the left. */
	left: CSSClassName;
	/** Applies content to the right. */
	right: CSSClassName;
}
