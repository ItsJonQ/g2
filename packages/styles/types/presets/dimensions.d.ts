import { CSSClassName } from '../shared';

declare type FrameProps = {
	width?: string | number;
	height?: string | number;
};

/** Modify width/height styles based on system presets. */
export declare interface FrameInterface {
	/** Applies custom width / height styles. */
	(props: FrameProps): CSSClassName;
	/** Applies width styles. */
	width: (width: string | number) => CSSClassName;
	/** Applies height styles. */
	height: (height: string | number) => CSSClassName;
}
