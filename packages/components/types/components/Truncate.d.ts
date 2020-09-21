import { PolymorphicComponent } from './_shared';

export declare type TruncateEllisizeMode = 'auto' | 'head' | 'tail' | 'middle';

export declare type TruncateProps = {
	/**
	 * The ellipsis string when `truncate` is set.
	 *
	 * @default '...'
	 */
	ellipsis?: string;
	/**
	 * Determines where to truncate. `truncate` must first be set.
	 *
	 * @default 'auto'
	 */
	ellipsizeMode?: TruncateEllisizeMode;
	/**
	 * Determines the max characters when `truncate` is set.
	 *
	 * @default 0
	 */
	limit?: number;
	/**
	 * Determines how many lines to truncate. `truncate` must first be set.
	 */
	numberOfLines?: number;
};

/**
 * `Truncate` is a typography primitive that trims text content. For almost all cases, it is recommended that `Text`, `Heading`, or `Subheading` is used to render text content. However, `Truncate` is available for custom implementations.
 *
 * @example
 * ```jsx
 * <Truncate>Where the north wind meets the sea</Truncate>
 * ```
 */
export declare const Truncate: PolymorphicComponent<TruncateProps>;
