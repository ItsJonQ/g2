import { PolymorphicComponent } from './_shared';
import { HStackProps } from './HStack';

export declare type VStackProps = HStackProps & {};

/**
 * `VStack` (or Vertical Stack) is a layout component that arranges child elements in a vertical line.
 *
 * @example
 * ```jsx
 * <VStack>
 * 	<View>...</View>
 * 	<View>...</View>
 * </VStack>
 * ```
 */
export declare const VStack: PolymorphicComponent<VStackProps>;
