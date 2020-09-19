import { PolymorphicComponent } from './_shared';
import { TextProps } from './Text';

export declare type InitialsProps = TextProps & {
	/**
	 * The name to render as initials.
	 *
	 * @example
	 * ```jsx
	 * <Initials name="Elsa" />
	 * ```
	 */
	name?: string;
};

/**
 * `Initials` renders Initialss and subtitles using the library's typography system.
 */
export declare const Initials: PolymorphicComponent<InitialsProps>;
