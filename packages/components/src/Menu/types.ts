import { MenuStateReturn } from 'reakit';
import { Props as BaseButtonProps } from '../BaseButton/types';

export type Props = {
	menu?: MenuStateReturn;
};

export type MenuItemProps = BaseButtonProps & {
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
