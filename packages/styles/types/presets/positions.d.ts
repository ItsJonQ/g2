import { CSSClassName } from '../shared';

/** Modify position styles based on system presets. */
export declare interface PositionInterface {
	/** Aligns content to full size of the parent element. */
	full: CSSClassName;
	/** Absolutely positions element. */
	absolute: CSSClassName;
	/** Fix positions element. */
	fixed: CSSClassName;
	/** Sticky positions element. */
	sticky: CSSClassName;
	/** Allows for inner content to position to. */
	relative: CSSClassName;
	/** Aligns content to the top. */
	top: CSSClassName;
	/** Aligns content to the top/left. */
	topLeft: CSSClassName;
	/** Aligns content to the top/right. */
	topRight: CSSClassName;
	/** Aligns content to the bottom. */
	bottom: CSSClassName;
	/** Aligns content to the bottom/left. */
	bottomLeft: CSSClassName;
	/** Aligns content to the bottom/right. */
	bottomRight: CSSClassName;
	/** Aligns content to the left. */
	left: CSSClassName;
	/** Aligns content to the right. */
	right: CSSClassName;
}
