import * as React from 'react';
import { ConnectedProps, CSS } from './_shared';

export declare type AspectRatioProps = {
	/**
	 * The width:height ratio to render.
	 * @default 1
	 *
	 * @example
	 * ```
	 * <AspectRatio ratio={16/9} />
	 * ```
	 */
	ratio?: number;
	/**
	 * A custom width.
	 */
	width?: CSS['width'];
};

/**
 * `AspectRatio` renders content with a given width:height ratio. A common example would be the **HD** `16:9` ratio.
 */
export declare const AspectRatio: React.FC<AspectRatioProps & ConnectedProps>;
