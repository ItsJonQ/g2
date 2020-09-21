import { PolymorphicComponent } from './_shared';
import { FlexProps } from './Flex';

export declare type ScrollableProps = {
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
