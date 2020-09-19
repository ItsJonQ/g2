import * as React from 'react';
import { ConnectedProps, AsProp } from './_shared';
import { TextProps } from './Text';

export declare type SubheadingProps = TextProps & {
	/**
	 *
	 * @default 'div'
	 */
	as?: AsProp;
};

/**
 * `Subheading` renders subheadings and subtitles using the library's typography system.
 */
export declare const Subheading: React.FC<ConnectedProps & SubheadingProps>;
