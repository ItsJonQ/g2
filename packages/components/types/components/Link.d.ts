import { PolymorphicComponent } from './_shared';
import { TextProps } from './Text';

export declare type LinkProps = TextProps & {};

/**
 * `Link` is a navigation component that renders an HTML link to a url.
 *
 * @example
 * ```jsx
 * <Link href="...">See Documentation</Link>
 * ```
 */
export declare const Link: PolymorphicComponent<'a', LinkProps>;
