import { PolymorphicComponent } from './_shared';
import { TextProps, TextSize } from './Text';
import { CSS } from './_shared';

export declare type HeadingSize = 1 | 2 | 3 | 4 | 5 | 6;

export declare type HeadingProps = TextProps & {
	/**
	 * Adjusts text size based on the typography system.
	 *
	 * @default 3
	 */
	size: HeadingSize | TextSize | CSS['fontSize'];
};

/**
 * `Heading` renders headings and titles using the library's typography system.
 *
 * @example
 * ```jsx
 * <Heading size={2}>Arendelle</Heading>
 * ```
 */
export declare const Heading: PolymorphicComponent<HeadingProps, 'div'>;
