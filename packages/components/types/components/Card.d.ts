import { PolymorphicComponent } from './_shared';
import { SurfaceProps } from './Surface';

export declare type CardProps = SurfaceProps & {
	/**
	 * Size of the elevation shadow, based on the Style system's elevation system.
	 * Elevating a `Card` can be done by adjusting the `elevation` prop. This may be helpful in highlighting certain content. For more information, check out `Elevation`.
	 *
	 * @example
	 * ```jsx
	 * import { Card, CardBody, Text } from `@wp-g2/components`
	 *
	 * function Example() {
	 *   return (
	 *     <Card elevation={8}>
	 *       <CardBody>
	 *         <Text>Card Content</Text>
	 *       </CardBody>
	 *     </Card>
	 *   );
	 * }
	 *```
	 */
	elevation?: number;
	/**
	 * Renders without a border.
	 *
	 * @default false
	 */
	isBorderless?: boolean;
	/**
	 * Renders with rounded corners.
	 *
	 * @default true
	 */
	isRounded?: boolean;
};

/**
 * `Card` is a layout component, providing a flexible and extensible content container.
 *
 * @remarks
 * `Card` provides convenient sub-components such as `CardBody`, `CardHeader`, and `CardFooter`.
 *
 * @example
 * ```jsx
 * import {
 *   Card,
 *   CardHeader,
 *   CardBody,
 *   CardFooter,
 *   Text,
 * } from `@wp-g2/components`
 *
 * function Example() {
 *   return (
 *     <Card>
 *       <CardHeader>
 *         <Heading size={4}>Card Title</Heading>
 *       </CardHeader>
 *       <CardBody>
 *         <Text>Card Content</Text>
 *       </CardBody>
 *       <CardFooter>
 *         <Text>Card Footer</Text>
 *       </CardFooter>
 *     </Card>
 *   );
 * }
 * ```
 */
export declare const Card: PolymorphicComponent<'div', CardProps>;

export declare type CardBodyProps = {
	/**
	 * Determines if `CardBody` is scrollable.
	 *
	 * @default true
	 */
	scrollable?: boolean;
};

/**
 * `CardBody` is a layout component, rendering the contents of a `Card`.
 * Multiple `CardBody` components can be used within `Card` if needed.
 *
 * @example
 * ```jsx
 * <Card>
 * 	<CardBody>
 * 		...
 * 	</CardBody>
 * </Card>
 * ```
 */
export declare const CardBody: PolymorphicComponent<'div', CardBodyProps>;

export declare type CardHeaderSize = 'medium' | 'small' | 'xSmall';

export declare type CardHeaderProps = {
	/**
	 * Determines the size of `CardHeader`.
	 *
	 * @default 'medium'
	 */
	size?: CardHeaderSize;
};

/**
 * `CardHeader` is a layout component, rendering the header contents of a `Card`.
 *
 * @example
 * ```jsx
 * <Card>
 * 	<CardHeader>...</CardHeader>
 * 	<CardBody>...</CardBody>
 * </Card>
 * ```
 */
export declare const CardHeader: PolymorphicComponent<'div', CardHeaderProps>;

export declare type CardFooterProps = CardHeaderProps & {};

/**
 * `CardFooter` is a layout component, rendering the footer content of a `Card`.
 *
 * @example
 * ```jsx
 * <Card>
 * 	<CardBody>...</CardBody>
 * 	<CardFooter>...</CardFooter>
 * </Card>
 * ```
 */
export declare const CardFooter: PolymorphicComponent<'div', CardFooterProps>;
