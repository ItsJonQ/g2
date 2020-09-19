import * as React from 'react';
import { ConnectedProps, CSS } from './_shared';

export declare type ImageProps = {
	/**
	 * Renders the image with a specific `AspectRatio`.
	 * @example
	 * ```
	 * <Image aspectRatio={16/9} />
	 * ```
	 */
	aspectRatio?: number;
	/**
	 * Resizes the image to fit a container, using CSS [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).
	 */
	fit?: CSS['objectFit'];
	/**
	 * The image height.
	 */
	height?: CSS['height'];
	/**
	 * The image width.
	 */
	width?: CSS['width'];
};

/**
 * `Image` is a core component that renders images in the library.
 */
export declare const Image: React.FC<ConnectedProps & ImageProps>;
