import { CSSClassName } from '../shared';

/** Modify opacity styles based on system presets. */
export declare interface OpacityInterface {
	/** Applies custom opacity value. */
	(value: number): CSSClassName;

	/** Adds slight transparency. */
	subtle: CSSClassName;
	/** Adds medium transparency. */
	muted: CSSClassName;
	/** Applies full transparency. */
	hidden: CSSClassName;
}
