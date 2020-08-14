import { CSSClassName } from '../shared';

/** Modify border styles based on system presets. */
export declare interface BorderInterface {
	/** Applies border to all sides. */
	all: CSSClassName;
	/** Applies border to the top side. */
	top: CSSClassName;
	/** Applies border to the top side. */
	bottom: CSSClassName;
	/** Applies border to the top side. */
	left: CSSClassName;
	/** Applies border to the top side. */
	right: CSSClassName;
}

/** Modify border radius styles based on system presets. */
export declare interface BorderRadiusInterface {
	/** Applies custom border-radius color. */
	(value: number | string): CSSClassName;
	/** Removes border radius. */
	none: CSSClassName;
	/** Applies rounded border radius. */
	round: CSSClassName;
	/** Applies circular border radius. */
	circle: CSSClassName;
}
