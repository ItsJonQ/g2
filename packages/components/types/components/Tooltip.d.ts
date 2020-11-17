import * as React from 'react';
import { TooltipState } from 'reakit';
import { PolymorphicComponent, PopperProps } from './_shared';

export declare type TooltipProps = TooltipState &
	PopperProps & {
		/**
		 * Determines if `Tooltip` has animations.
		 */
		animated?: boolean;
		/**
		 * The duration of `Tooltip` animations.
		 *
		 * @default 160
		 */
		animationDuration?: boolean;
		/**
		 * ID that will serve as a base for all the items IDs.
		 *
		 * @see https://reakit.io/docs/tooltip/#usetooltipstate
		 */
		baseId?: string;
		/**
		 * Content to render within the `Tooltip` floating label.
		 */
		content?: React.ReactElement | string;
		/**
		 * Spacing between the `Tooltip` reference and the floating label.
		 *
		 * @default 4
		 *
		 * @see https://reakit.io/docs/tooltip/#usetooltipstate
		 */
		gutter?: number;
		/**
		 * Whether or not the dialog should be rendered within `Portal`. It's true by default if modal is true.
		 *
		 * @default true
		 *
		 * @see https://reakit.io/docs/tooltip/#tooltip
		 */
		modal?: boolean;
		/**
		 * Whether `Tooltip` is visible.
		 *
		 * @default false
		 *
		 * @see https://reakit.io/docs/tooltip/#usetooltipstate
		 */
		visible?: boolean;
	};

/**
 * `Tooltip` is a component that provides context for a user interface element.
 *
 * @example
 * ```jsx
 * <Tooltip content="I like warm hugs">
 * 	<Text>Olaf</Text>
 * </Tooltip>
 * ```
 */
export declare const Tooltip: PolymorphicComponent<TooltipProps>;
