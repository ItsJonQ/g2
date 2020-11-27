import { CSSProperties } from 'react';
import { PopperProps } from '../utils/types';
import { Props as MenuProps, MenuItemProps } from '../Menu/types';

export declare type Props = PopperProps & {
	/**
	 * Determines if `Dropdown` has animations.
	 *
	 * @default true
	 */
	animated?: boolean;
	/**
	 * The duration of `Dropdown` animations.
	 *
	 * @default 160
	 */
	animationDuration?: boolean;
	/**
	 * The easing (timing-function) for the `Dropdown` open/closing animations.
	 *
	 * @default 'ease'
	 */
	animationTimingFunction?: CSSProperties['transitionTimingFunction'];
	/**
	 * ID that will serve as a base for all the items IDs.
	 *
	 * @see https://reakit.io/docs/menu/#usemenustate
	 */
	baseId?: string;
	/**
	 * Renders spacing between the `DropdownMenu` and the `DropdownTrigger` when visible.
	 *
	 * @default 5
	 *
	 * @see https://reakit.io/docs/menu/#usemenustate
	 */
	gutter?: number;
	/**
	 * The aria-label for `Dropdown` for screen-readers.
	 */
	label?: string;
	/**
	 * Whether or not the dialog should be rendered within `Portal`. It's true by default if modal is true.
	 *
	 * @default true
	 *
	 * @see https://reakit.io/docs/menu/#usemenustate
	 */
	modal?: boolean;
	/**
	 * Whether `Dropdown` is visible.
	 *
	 * @default false
	 *
	 * @see https://reakit.io/docs/menu/#usemenustate
	 */
	visible?: boolean;
};

export declare type DropdownMenuProps = MenuProps & {
	/**
	 * Renders `Elevation` styles for the `DropdownMenu`.
	 *
	 * @default 3
	 */
	elevation?: number;
	/**
	 * When an element is disabled, it may still be focusable. It works similarly to readOnly on form elements.
	 * In this case, only aria-disabled will be set.
	 *
	 * @see https://reakit.io/docs/menu/#menu
	 */
	focusable?: boolean;
	/**
	 * Hides the `Dropdown` when clicked outside.
	 *
	 * @default true
	 */
	hideOnClickOutside?: boolean;
	/**
	 * The maximum width of `DropdownMenu`.
	 */
	maxWidth?: CSSProperties['maxWidth'];
	/**
	 * The minimum width of `DropdownMenu`.
	 *
	 * @default 200
	 */
	minWidth?: CSSProperties['minWidth'];
};

export declare type DropdownMenuItemProps = MenuItemProps & {
	/**
	 * When an element is disabled, it may still be focusable. It works similarly to readOnly on form elements.
	 * In this case, only aria-disabled will be set.
	 *
	 * @see https://reakit.io/docs/menu/#menuitem
	 */
	focusable?: boolean;
};
