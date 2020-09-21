import { CSS, PolymorphicComponent, ResponsiveCSSValue } from './_shared';

export declare type ContainerAlignment = 'left' | 'center' | 'right';

export declare type ContainerProps = {
	/**
	 * Horizontal alignment of `Container`.
	 *
	 * @default 'center'
	 */
	alignment?: ContainerAlignment;
	/**
	 * The max-width of `Container`.
	 *
	 * @default 1280
	 */
	width?: ResponsiveCSSValue<CSS['width']>;
};

/**
 * `Container` is a layout component that responsively centers content within a defined width.
 *
 * @example
 * ```jsx
 * <Container width={800}>
 * 	...
 * </Container>
 * ```
 */
export declare const Container: PolymorphicComponent<ContainerProps>;
