import * as React from 'react';
import { PolymorphicComponent } from './_shared';
import { TooltipProps } from './Tooltip';

export declare type HelpTipProps = TooltipProps & {
	/**
	 * The size of the help `Icon`.
	 *
	 * @default 14
	 */
	iconSize?: number;
};

/**
 * `HelpTip` is a component that provides help context within a `Tooltip`, represented by a question mark icon.
 *
 * @example
 * ```jsx
 * <HelpTip>
 * 	Whoa, so this is heat. I love it! Ow, but don’t touch it!
 * </HelpTip>
 * ```
 */
export declare const HelpTip: PolymorphicComponent<'div', HelpTipProps>;
