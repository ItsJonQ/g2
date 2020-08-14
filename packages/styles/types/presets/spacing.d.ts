import { CSSClassName } from '../shared';

type SpacingValue = number | string;

type SpacingFunction = (value: number | string) => CSSClassName;

/** Modify margin styles based on system presets. */
export declare interface MarginInterface {
	/** Applies custom margin value to all sides. */
	(value: number | string): CSSClassName;

	/** Applies margin left and right values. */
	x: SpacingFunction;
	/** Applies margin top and bottom values. */
	y: SpacingFunction;
	/** Applies margin left value. */
	left: SpacingFunction;
	/** Applies margin right value. */
	right: SpacingFunction;
	/** Applies margin top value. */
	top: SpacingFunction;
	/** Applies margin bottom value. */
	bottom: SpacingFunction;
}

/** Modify padding styles based on system presets. */
export declare interface PaddingInterface {
	/** Applies custom padding value to all sides. */
	(value: number | string): CSSClassName;

	/** Applies padding left and right values. */
	x: SpacingFunction;
	/** Applies padding top and bottom values. */
	y: SpacingFunction;
	/** Applies padding left value. */
	left: SpacingFunction;
	/** Applies padding right value. */
	right: SpacingFunction;
	/** Applies padding top value. */
	top: SpacingFunction;
	/** Applies padding bottom value. */
	bottom: SpacingFunction;
}
