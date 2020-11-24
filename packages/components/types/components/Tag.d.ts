import { PolymorphicComponent } from './_shared';
import { BadgeProps } from './Badge';

export declare type TagProps = Pick<BadgeProps, 'color' | 'display'> & {
	/**
	 * A link for `Tag`.
	 */
	href?: string;
	/**
	 * Callback when the remove button is clicked.
	 */
	onRemove?: (...args: any) => void;
	/**
	 * Title label for the remove actions. Enables the remove action when defined.
	 */
	removeButtonText?: string;
};

/**
 * `Tag` is a component that labels UI objects for navigation and context.
 *
 * @example
 * ```jsx
 * <Flex wrap>
 * 	<Tag>Ana</Tag>
 * 	<Tag>Elsa</Tag>
 * 	<Tag>Olaf</Tag>
 * </Flex>
 * ```
 */
export declare const Tag: PolymorphicComponent<'div', TagProps>;
