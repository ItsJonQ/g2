import { PolymorphicComponent } from './_shared';

export declare type ScrollableDirection = 'x' | 'y' | 'auto';

export declare type ScrollableProps = {
	/**
	 * Renders a scrollbar for a specific axis when content overflows.
	 *
	 * @default 'y'
	 */
	scrollDirection?: ScrollableDirection;
	/**
	 * Enables (CSS) smooth scrolling.
	 *
	 * @default false
	 */
	smoothScroll?: boolean;
};

/**
 * `Scrollable` is a layout component that content in a scrollable container.
 *
 * @example
 * ```jsx
 * <Scrollable><View>...</View></Scrollable>
 * ```
 */
export declare const Scrollable: PolymorphicComponent<ScrollableProps>;
