import { CSSClassName } from '../shared';

type ShadowProps = {
	/** Shadow color. */
	color?: string;
	/** Shadow spread value. */
	radius?: number;
	/** Shadow left offset. */
	x?: number;
	/** Shadow top offset. */
	y?: number;
};

/** Modify box-shadow styles based on system presets. */
export declare interface ShadowInterface {
	/** Applies custom box shadow. */
	(value: number | ShadowProps): CSSClassName;
}
