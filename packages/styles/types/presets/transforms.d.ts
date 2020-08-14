import { CSSClassName } from '../shared';

type OffsetValue = number | string;
type OffsetProps = {
	/** Horizontal offset value. */
	x?: OffsetValue;
	/** Vertical offset value. */
	y?: OffsetValue;
};

/** Modify offset (transform) styles based on system presets. */
export declare interface OffsetInterface {
	/** Applies custom offset values. */
	(value: OffsetValue | OffsetProps, y?: OffsetValue): CSSClassName;
	/** Applies custom horizontal offset values. */
	x: (value: OffsetValue) => CSSClassName;
	/** Applies custom vertical offset values. */
	y: (value: OffsetValue) => CSSClassName;
}

/** Modify scale (transform) styles based on system presets. */
export declare interface ScaleInterface {
	(value: string | number): CSSClassName;
}

/** Modify rotate (transform) styles based on system presets. */
export declare interface RotateInterface {
	(value: number): CSSClassName;
}
