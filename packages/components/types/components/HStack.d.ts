import * as React from 'react';
import { ConnectedProps, CSS } from './_shared';
import { FlexProps } from './Flex';

export declare type HStackAlignment =
	| 'bottom'
	| 'bottomLeft'
	| 'bottomRight'
	| 'center'
	| 'edge'
	| 'left'
	| 'right'
	| 'stretch'
	| 'top'
	| 'topLeft'
	| 'topRight';

export declare type HStackProps = {
	/**
	 * The width:height ratio to render.
	 * @default 1
	 *
	 * @example
	 * ```a
	 * <AspectRatio ratio={16/9} />
	 * ```
	 */
	direction?: HStackAlignment & CSS['alignItems'];
	/**
	 * The amount of space between each child element.
	 * @default 2
	 */
	spacing?: CSS['width'];
};

/**
 * `HStack` (Horizontal Stack) arranges child elements in a horizontal line.
 */
export declare const HStack: React.FC<FlexProps & HStackProps & ConnectedProps>;
