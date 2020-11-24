import { CSS, PolymorphicComponent } from './_shared';
import { BaseButtonProps } from './BaseButton';

export declare type MenuProps = {};

/**
 * `Menu` is an actionable component that displays a list of actions, links, or informative content.
 *
 * @example
 * ```jsx
 * <Menu>
 *  <MenuItem>...</MenuItem>
 *  <MenuItem>...</MenuItem>
 *  <MenuItem>...</MenuItem>
 * </Menu>
 * ```
 *
 * @see https://reakit.io/docs/menu/#menu
 */
export declare const Menu: PolymorphicComponent<'div', MenuProps>;

export declare type MenuItemProps = BaseButtonProps & {
	/**
	 * Renders a "back" arrow `Icon`, indicating a backwards navigation direction.
	 *
	 * @default false
	 */
	isBack?: boolean;
	/**
	 * Renders offset styles, used for negative margins within list-based component (e.g. `ListGroup`).
	 */
	isOffset?: boolean;
	/**
	 * Renders a "forward" arrow `Icon`, indicating a forwards navigation direction.
	 *
	 * @default false
	 */
	showArrow?: boolean;
};

/**
 * `MenuItem` is an actionable component that renders within a `Menu`.
 *
 * @example
 * ```jsx
 * <Menu>
 *  <MenuItem onClick={...}>Ana</MenuItem>
 *  <MenuItem onClick={...}>Elsa</MenuItem>
 *  <MenuItem onClick={...}>Olaf</MenuItem>
 * </Menu>
 * ```
 *
 * @see https://reakit.io/docs/menu/#menuitem
 */
export declare const MenuItem: PolymorphicComponent<'button', MenuItemProps>;
