import { PolymorphicComponent } from './_shared';
import { TextProps } from './Text';

export declare type InitialsProps = TextProps & {
	/**
	 * The name to render as initials.
	 */
	name?: string;
};

/**
 * `Initials` renders Initialss and subtitles using the library's typography system.
 *
 * @example
 * ```jsx
 * import { Initials } from `@wp-g2/components`
 *
 * function Example() {
 *   return <Initials name="Elsa Oldenburg" />;
 * }
 * ```
 */
export declare const Initials: PolymorphicComponent<'div', InitialsProps>;
