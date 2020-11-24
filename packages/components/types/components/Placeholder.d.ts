import { CSS, PolymorphicComponent } from './_shared';

export declare type PlaceholderProps = {
	/**
	 * Height of `Placeholder`.
	 *
	 * @default 36
	 */
	height?: CSS['width'];
	/**
	 * Width of `Placeholder`.
	 */
	width?: CSS['width'];
};

/**
 * `Placeholder` is a layout component that renders placeholder user-interface element, typically used for loading states.
 *
 * @example
 * ```jsx
 * <Placeholder height={50} width={200} />
 * ```
 */
export declare const Placeholder: PolymorphicComponent<'div', PlaceholderProps>;
