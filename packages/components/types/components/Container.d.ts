import * as React from 'react';
import { CSS, ConnectedProps, ResponsiveCSSValue } from './_shared';

export declare type ContainerAlignment = 'left' | 'center' | 'right';

export declare type ContainerProps = {
	/**
	 * Horizontal alignment of `Container`.
	 * @default 'center'
	 */
	alignment?: ContainerAlignment;
	/**
	 * The max-width of `Container`.
	 * @default 1280
	 */
	width?: ResponsiveCSSValue<CSS['width']>;
};

/**
 * `Container` is a layout component that responsively centers content within a defined width.
 */
export declare const Container: React.FC<ContainerProps & ConnectedProps>;
