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
	icon?: unknown;
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
export declare const Icon: PolymorphicComponent<IconProps>;
