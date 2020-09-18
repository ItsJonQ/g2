import * as React from 'react';
import { ConnectedProps, AsProp } from './_shared';
import { TextProps, TextSize } from './Text';
import { CSS } from './_shared';

export declare type HeadingSize = 1 | 2 | 3 | 4 | 5 | 6;

export declare type HeadingProps = TextProps & {
	/**
	 * @default 'div'
	 */
	as?: AsProp;
	/**
	 * Adjusts text size based on the typography system.
	 * @default 3
	 */
	size: HeadingSize | TextSize | CSS['fontSize'];
};

/**
 * `Heading` renders headings and titles using the library's typography system.
 */
export declare const Heading: React.FC<HeadingProps & ConnectedProps>;
