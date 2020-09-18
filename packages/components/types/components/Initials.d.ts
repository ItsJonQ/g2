import * as React from 'react';
import { ConnectedProps } from './_shared';
import { TextProps } from './Text';

export declare type InitialsProps = TextProps & {
	/**
	 * The name to render as initials.
	 * @example
	 * ```
	 * <Initials name="Elsa" />
	 * ```
	 */
	name?: string;
};

/**
 * `Initials` renders Initialss and subtitles using the library's typography system.
 */
export declare const Initials: React.FC<InitialsProps & ConnectedProps>;
