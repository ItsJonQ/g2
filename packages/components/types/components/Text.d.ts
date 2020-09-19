import { PolymorphicComponent, CSS } from './_shared';
import { TruncateProps } from './Truncate';

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
	 */
	align?: CSS['textAlign'];
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
	 * Highlights words within the text content.
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
	 * Optimizes text (black or white) readability for given background color.
	 */
	optimizeReadabilityFor?: CSS['color'];
	/**
	 * Adjusts text size based on the typography system.
	 */
	size?: CSS['fontSize'] | TextSize;
	/**
	 * Enables text truncation.
	 */
	truncate?: boolean;
	/**
	 * Uppercases the text content.
	 */
	upperCase?: boolean;
	/**
	 * Adjusts style variation of the text.
	 */
	variant?: TextVariant;
	/**
	 * Adjusts font-weight of the text.
	 */
	weight?: CSS['fontWeight'] | TextWeight;
};

/**
 * `Text` is a core component that renders text in the library, using the library's typography system.
 */
export declare const Text: PolymorphicComponent<TextProps, 'span'>;
