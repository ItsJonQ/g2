import * as React from 'react';
import { CSS, PolymorphicComponent, PopperProps } from './_shared';

export declare type PopoverProps = PopperProps & {
	/**
	 * Determines if `Popover` has animations.
	 */
	animated?: boolean;
	/**
	 * The duration of `Popover` animations.
	 *
	 * @default 160
	 */
	animationDuration?: boolean;
	/**
	 * ID that will serve as a base for all the items IDs.
	 *
	 * @see https://reakit.io/docs/popover/#usepopoverstate
	 */
	baseId?: string;
	/**
	 * Content to render within the `Popover` floating label.
	 */
	content?: React.Component | string;
	/**
	 * Renders `Elevation` styles for the `Popover`.
	 *
	 * @default 5
	 */
	elevation?: number;
	/**
	 * Whether or not the dialog should be rendered within `Portal`. It's true by default if modal is true.
	 *
	 * @default true
	 *
	 * @see https://reakit.io/docs/popover/#popover
	 */
	modal?: boolean;
	/**
	 * Max-width for the `Popover` element.
	 */
	maxWidth?: CSS['maxWidth'];
	/**
	 * Callback for when the `visible` state changes.
	 */
	onVisibleChange?: (...args: any) => void;
	/**
	 * Element that triggers the `visible` state of `Popover` when clicked.
	 *
	 * @example
	 * ```jsx
	 * <Popover trigger={<Button>Greet</Button>}>
	 *  <Text>Hi! I'm Olaf!</Text>
	 * </Popover>
	 * ```
	 */
	trigger?: React.Component;
	/**
	 * Whether `Popover` is visible.
	 *
	 * @default false
	 *
	 * @see https://reakit.io/docs/popover/#usepopoverstate
	 */
	visible?: boolean;
};

/**
 * `Popover` is a component that provides context and controls in an
 *
 * @example
 * ```jsx
 * <Popover trigger={<Button>Greet</Button>}>
 *  <Text>Hi! I'm Olaf!</Text>
 * </Popover>
 * ```
 */
export declare const Popover: PolymorphicComponent<PopoverProps>;
