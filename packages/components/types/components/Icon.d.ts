import { ReactNode } from 'react';
import { CSS, PolymorphicComponent } from './_shared';

export declare type IconProps = {
	/**
	 * Determines if the `Alert` is dismissable. If it is, a `CloseButton` will render.
	 *
	 * @default false
	 */
	color?: CSS['color'];
	/**
	 * The SVG component for `Icon`.
	 *
	 * @example
	 * ```jsx
	 * <Icon icon={<OlafIcon />} />
	 * ```
	 */
	icon?: ReactNode;
	/**
	 * Adjusts the display and alignment of `Icon` for use within Text based components.
	 *
	 * @example
	 * ```jsx
	 * <Text>
	 * 	Olaf! <Icon icon={<OlafIcon />} inline />
	 * </Text>
	 * ```
	 */
	inline?: boolean;
	/**
	 * The size of `Icon`.
	 *
	 * @default 20
	 */
	size?: CSS['height'];
};

/**
 * `Icon` is an image component that renders scalable SVG icon graphics.
 *
 * @example
 * ```jsx
 * <Icon icon={<FrozenIcon />} />
 * ```
 */
export declare const Icon: PolymorphicComponent<'div', IconProps>;
