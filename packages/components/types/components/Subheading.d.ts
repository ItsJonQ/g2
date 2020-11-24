import { PolymorphicComponent } from './_shared';
import { TextProps } from './Text';

export declare type SubheadingProps = TextProps & {};

/**
 * `Subheading` renders subheadings and subtitles using the library's typography system.
 *
 * @example
 * ```jsx
 * import { Subheading } from `@wp-g2/components`
 *
 * function Example() {
 *   return <Subheading>Into The Unknown</Subheading>;
 * }
 * ```
 */
export declare const Subheading: PolymorphicComponent<'div', SubheadingProps>;
