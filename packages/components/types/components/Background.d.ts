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
 * <Background>
 * 	...
 * </Background>
 * ```
 */
export declare const Background: PolymorphicComponent<BackgroundProps>;
