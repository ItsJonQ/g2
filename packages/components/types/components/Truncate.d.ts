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
	 * Determines where to truncate. `truncate` must first be set. For example, we can truncate text right in the middle. To do this, we need to set `ellipsizeMode` to `middle` and a text `limit`.
	 *
	 * @default 'auto'
	 *
	 * @example
	 * ```jsx
	 * import { Text } from `@wp-g2/components`
	 *
	 * function Example() {
	 * 	return (
	 * 		<Text truncate ellipsizeMode="middle" limit={40}>
	 * 			Where the north wind meets the sea, there's a river full of memory. Sleep,
	 * 			my darling, safe and sound, for in this river all is found. In her waters,
	 * 			deep and true, lay the answers and a path for you. Dive down deep into her
	 * 			sound, but not too far or you'll be drowned
	 * 		</Text>
	 * 	)
	 * }
	 * ```
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
 * import { Truncate } from `@wp-g2/components`
 *
 * function Example() {
 *   return (
 *     <Truncate>
 *       Where the north wind meets the sea, there's a river full of memory. Sleep,
 *       my darling, safe and sound, for in this river all is found. In her waters,
 *       deep and true, lay the answers and a path for you. Dive down deep into her
 *       sound, but not too far or you'll be drowned
 *     </Truncate>
 *   );
 * }
 * ```
 */
export declare const Truncate: PolymorphicComponent<TruncateProps>;
