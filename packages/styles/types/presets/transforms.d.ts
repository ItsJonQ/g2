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

/** Modify scale (transform) styles. */
export declare interface ScaleInterface {
	(value: string | number): CSSClassName;
}

/** Modify scaleX (transform) styles. */
export declare interface ScaleXInterface {
	(value: string | number): CSSClassName;
}

/** Modify scaleY (transform) styles. */
export declare interface ScaleYInterface {
	(value: string | number): CSSClassName;
}

/** Modify rotate (transform) styles. */
export declare interface RotateInterface {
	(value: number): CSSClassName;
}
