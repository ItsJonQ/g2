import { CSSClassName } from '../shared';

/** Modify animation styles based on system presets. */
export declare interface AnimationInterface {
	/** Applies custom animation settings. */
	(animation: string): CSSClassName;
	/** Applies custom default animation styles. */
	default: CSSClassName;
	/** Applies a bounce animation timing. */
	bounce: CSSClassName;
	/** Applies custom animation duration styles. */
	duration: (duration: number) => CSSClassName;
	/** Applies custom animation easing styles. */
	easing: (easing: string) => CSSClassName;
	/** Applies an ease-in animation timing. */
	easeIn: CSSClassName;
	/** Applies an ease animation timing. */
	ease: CSSClassName;
	/** Applies an ease-in-out animation timing. */
	easeInOut: CSSClassName;
	/** Applies an ease-out animation timing. */
	easeOut: CSSClassName;
	/** Applies an linear animation timing. */
	linear: CSSClassName;
}
