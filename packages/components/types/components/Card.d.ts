import * as React from 'react';
import { ConnectedProps } from './_shared';

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
export declare const Card: React.FC<CardProps & ConnectedProps>;

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
export declare const CardBody: React.FC<ConnectedProps & CardBodyProps>;

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
export declare const CardHeader: React.FC<ConnectedProps & CardHeaderProps>;

/**
 * `CardFooter` is a layout component, rendering the footer content of a `Card`.
 */
export declare const CardFooter: React.FC<ConnectedProps & CardHeaderProps>;
