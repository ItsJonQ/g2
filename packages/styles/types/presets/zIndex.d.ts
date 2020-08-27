import { CSSClassName } from '../shared';

/** Modify z-index styles based on system presets. */
export declare interface ZIndexInterface {
	/** Applies custom z-index values. */
	(value: string | number, fallback?: number): CSSClassName;
	/** Retrieves the z-index registry. */
	get: () => any;
}
