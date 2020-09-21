import * as React from 'react';

export declare type ViewportBreakpoint = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export declare type ViewportProps = {
	/**
	 * A viewport (device) size (width) to render content for.
	 *
	 * @default 'md'
	 */
	breakpoint?: ViewportBreakpoint;
	/**
	 * A custom (CSS) media query to render content for.
	 *
	 * @example
	 * ```jsx
	 * <Viewport media={{ minWidth: 768 }}>...</Viewport>
	 * ```
	 */
	media?: object | string;
};

/**
 * `Viewport` is a layout component that renders content given a specific device viewport size.
 *
 * @example
 * ```jsx
 * <Viewport breakpoint="md">
 * 	<Card>...</Card>
 * </Viewport>
 * ```
 */
export declare const Viewport: React.FC<ViewportProps>;

/**
 * `ViewportMobile` is a layout component that renders content only for smaller mobile devices / screen sizes.
 */
export declare const ViewportMobile: React.FC<ViewportProps>;

/**
 * `ViewportPhablet` is a layout component that renders content for smaller to medium-sized devices / screen sizes and above.
 */
export declare const ViewportPhablet: React.FC<ViewportProps>;

/**
 * `ViewportPhabletOnly` is a layout component that renders content only for smaller to medium-sized devices / screen sizes.
 */
export declare const ViewportPhabletOnly: React.FC<ViewportProps>;

/**
 * `ViewportTablet` is a layout component that renders content for medium-sized devices / screen sizes and above.
 */
export declare const ViewportTablet: React.FC<ViewportProps>;

/**
 * `ViewportTabletOnly` is a layout component that renders content only for medium-sized devices / screen sizes and above.
 */
export declare const ViewportTabletOnly: React.FC<ViewportProps>;

/**
 * `ViewportDesktop` is a layout component that renders content for larger devices / screen sizes and above.
 */
export declare const ViewportDesktop: React.FC<ViewportProps>;
