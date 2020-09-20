import { PolymorphicComponent } from './_shared';

export declare type CardProps = {
	/**
	 * Size of the elevation shadow, based on the Style system's elevation system.
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
 */
export declare const Card: PolymorphicComponent<CardProps>;

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
 */
export declare const CardBody: PolymorphicComponent<CardBodyProps>;

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
 */
export declare const CardHeader: PolymorphicComponent<CardHeaderProps>;

export declare type CardFooterProps = CardHeaderProps & {};

/**
 * `CardFooter` is a layout component, rendering the footer content of a `Card`.
 */
export declare const CardFooter: PolymorphicComponent<CardFooterProps>;
