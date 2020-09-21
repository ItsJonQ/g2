import { PolymorphicComponent } from './_shared';

export declare type SurfaceVariant = 'primary' | 'secondary' | 'tertiary';

export declare type SurfaceProps = {
	/**
	 *  Renders a border around the entire `Surface`.
	 */
	border?: boolean;
	/**
	 * Renders a bottom border.
	 */
	borderBottom?: boolean;
	/**
	 * Renders a left border.
	 */
	borderLeft?: boolean;
	/**
	 * Renders a right border.
	 */
	borderRight?: boolean;
	/**
	 * Renders a top border.
	 */
	borderTop?: boolean;
	/**
	 * Modifies the background color of `Surface`.
	 */
	variant?: SurfaceVariant;
};

/**
 * `Surface` is a core component that renders a primary background color.
 *
 * @example
 * ```jsx
 * <Surface>...</Surface>
 * ```
 */
export declare const Surface: PolymorphicComponent<SurfaceProps>;
