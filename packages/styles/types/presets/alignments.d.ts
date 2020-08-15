import { CSSClassName } from '../shared';

/** Modify content alignment based on system presets. */
interface ControlBorderInterface {
	/** Center aligns content vertically and horizontally. */
	center: CSSClassName;
	/** Left aligns content. */
	left: CSSClassName;
	/** Right aligns content. */
	right: CSSClassName;
	/** Top aligns content. */
	top: CSSClassName;
	/** Bottom aligns content. */
	bottom: CSSClassName;
}

/** Modify alignment styles based on system presets. */
export declare interface AlignmentInterface {
	/** Aligns content based on system presets. */
	content: ControlBorderInterface;
	/** Applies left-align styles. */
	left: CSSClassName;
	/** Applies right-align styles. */
	right: CSSClassName;
	/** Applies center-align styles. */
	center: CSSClassName;
}
