import { PolymorphicComponent } from './_shared';
import { SurfaceProps, SurfaceVariant } from './Surface';

export declare type BackgroundProps = Omit<SurfaceProps, 'variant'> & {
	/**
	 *
	 * Modifies the background color of `Surface`.
	 *
	 * @default 'secondary'
	 */
	variant?: SurfaceVariant;
};

/**
 * `Background` is a core component that renders a `Surface` with a secondary background color.
 *
 * @example
 * ```jsx
 * import { Background, Surface, Text } from `@wp-g2/components`
 * import { ui } from `@wp-g2/styles`
 *
 * function Example() {
 *   return (
 *     <Background css={[ui.padding(5)]}>
 *       <Surface css={[ui.padding(5)]}>
 *         <Text>Into The Unknown</Text>
 *       </Surface>
 *     </Background>
 *   );
 * }
 * ```
 */
export declare const Background: PolymorphicComponent<BackgroundProps>;
