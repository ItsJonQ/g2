import { PolymorphicComponent, CSS } from './_shared';
import { TruncateProps } from './Truncate';

export declare type TextAdjustLineHeightForInnerControls =
	| boolean
	| 'large'
	| 'medium'
	| 'small'
	| 'xSmall';

export declare type TextSize =
	| 'body'
	| 'caption'
	| 'footnote'
	| 'largeTitle'
	| 'subheadline'
	| 'title';

export declare type TextVariant = 'muted';

export declare type TextWeight =
	| 100
	| 200
	| 300
	| 400
	| 500
	| 600
	| 700
	| 800
	| 900;

export declare type TextProps = TruncateProps & {
	/**
	 * Adjusts the text alignment.
	 *
	 * @example
	 * ```jsx
	 * import { Text } from `@wp-g2/components`
	 *
	 * function Example() {
	 * 	return (
	 * 		<Text align="center" isBlock>
	 * 			Where the north wind meets the sea...
	 * 		</Text>
	 * 	)
	 * }
	 *```
	 */
	align?: CSS['textAlign'];
	/**
	 * Automatically calculate the appropriate line-height value for contents that render text and Control elements (e.g. `TextInput`).
	 *
	 * @example
	 * ```jsx
	 * import { Text, TextInput } from `@wp-g2/components`
	 *
	 * function Example() {
	 * 	return (
	 * 		<Text adjustLineHeightForInnerControls>
	 * 			Where the north wind meets the <TextInput value="sea..." />
	 * 		</Text>
	 * 	)
	 * }
	 *```
	 */
	adjustLineHeightForInnerControls?: TextAdjustLineHeightForInnerControls;
	/**
	 * Adjusts the text color.
	 */
	color?: CSS['color'];
	/**
	 * Adjusts the CSS display.
	 */
	display?: CSS['display'];
	/**
	 * Renders a destructive color.
	 *
	 * @default false
	 */
	isDestructive?: boolean;
	/**
	 * Determines if `highlightWords` should be case sensitive.
	 */
	highlightEscape?: boolean;
	/**
	 * Escape characters in `highlightWords` which are meaningful in regular expressions.
	 */
	highlightCaseSensitive?: boolean;
	/**
	 * Letters or words within `Text` can be highlighted using `highlightWords`.
	 *
	 * @example
	 * ```jsx
	 * import { Text } from `@wp-g2/components`
	 *
	 * function Example() {
	 *   return (
	 *     <Text highlightWords={["the"]}>
	 *       Where the north wind meets the sea, there's a river full of memory. Sleep,
	 *       my darling, safe and sound, for in this river all is found. In her waters,
	 *       deep and true, lay the answers and a path for you. Dive down deep into her
	 *       sound, but not too far or you'll be drowned
	 *     </Text>
	 *   )
	 * }
	 * ```
	 */
	highlightWords?: Array<string | any>;
	/**
	 * Array of search words. String search terms are automatically cast to RegExps unless `highlightEscape` is true.
	 */
	highlightSanitize?: boolean;
	/**
	 * Sets `Text` to have `display: block`.
	 */
	isBlock?: boolean;
	/**
	 * Adjusts all text line-height based on the typography system.
	 */
	lineHeight?: CSS['lineHeight'];
	/**
	 * The `Text` color can be adapted to a background color for optimal readability. `optimizeReadabilityFor` can accept CSS variables, in addition to standard CSS color values (e.g. Hex, RGB, HSL, etc...).
	 *
	 * @example
	 * ```jsx
	 * import { Text, View } from `@wp-g2/components`
	 *
	 * function Example() {
	 *   const backgroundColor = "blue"
	 *
	 *   return (
	 *     <View css={{ backgroundColor }}>
	 *       <Text optimizeReadabilityFor={backgroundColor}>
	 *         Where the north wind meets the sea, there's a river full of memory.
	 *       </Text>
	 *     </View>
	 *   )
	 * }
	 * ```
	 */
	optimizeReadabilityFor?: CSS['color'];
	/**
	 * Adjusts text size based on the typography system. `Text` can render a wide range of font sizes, which are automatically calculated and adapted to the typography system. The `size` value can be a system preset, a `number`, or a custom unit value (`string`) such as `30em`.
	 *
	 * @example
	 * ```jsx
	 * import { Text } from `@wp-g2/components`
	 *
	 * function Example() {
	 *   return <Text size="largeTitle">Where the north wind meets the sea...</Text>
	 * }
	 * ```
	 */
	size?: CSS['fontSize'] | TextSize;
	/**
	 * Enables text truncation. When `truncate` is set,we are able to truncate the long text in a variety of ways.
	 *
	 * @example
	 *
	 * ```jsx
	 * import { Text } from `@wp-g2/components`
	 *
	 * function Example() {
	 *   return (
	 *     <Text truncate>
	 *       Where the north wind meets the sea, there's a river full of memory. Sleep,
	 *       my darling, safe and sound, for in this river all is found. In her waters,
	 *       deep and true, lay the answers and a path for you. Dive down deep into her
	 *       sound, but not too far or you'll be drowned
	 *     </Text>
	 *   )
	 * }
	 * ```
	 */
	truncate?: boolean;
	/**
	 * Uppercases the text content.
	 */
	upperCase?: boolean;
	/**
	 * Adjusts style variation of the text.
	 *
	 * @example
	 * ```jsx
	 * import { Text } from `@wp-g2/components`
	 *
	 * function Example() {
	 *   return <Text variant="muted">Where the north wind meets the sea...</Text>
	 * }
	 * ```
	 */
	variant?: TextVariant;
	/**
	 * Adjusts font-weight of the text.
	 */
	weight?: CSS['fontWeight'] | TextWeight;
};

/**
 * `Text` is a core component that renders text in the library, using the library's typography system.
 *
 * @remarks
 * `Text` can be used to render any text-content, like an HTML `p` or `span`.
 *
 * @example
 * ```jsx
 * import { Text } from `@wp-g2/components`
 *
 * function Example() {
 *   return <Text>Where the north wind meets the sea</Text>
 * }
 * ```
 */
export declare const Text: PolymorphicComponent<'span', TextProps>;
