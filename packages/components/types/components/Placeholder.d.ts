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
 */
export declare const Placeholder: PolymorphicComponent<PlaceholderProps>;
