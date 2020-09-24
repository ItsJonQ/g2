import { PolymorphicComponent } from './_shared';

export declare type SurfaceVariant =
	| 'primary'
	| 'secondary'
	| 'tertiary'
	| 'dotted'
	| 'grid';

export declare type SurfaceProps = {
	/**
	 * Determines the grid size for "dotted" and "grid" variants.
	 */
	backgroundSize?: number;
	/**
	 * Renders a border around the entire `Surface`.
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
	 *
	 * * `primary`: Used for almost all cases.
	 * * `secondary`: Used as a secondary background for inner `Surface` components.
	 * * `tertiary`: Used as the app/site wide background. Visible in **dark mode** only. Use case is rare.
	 *
	 * @example
	 * ```jsx
	 * import { Surface, Text, VStack } from `@wp-g2/components`
	 * import { ui } from `@wp-g2/styles`
	 *
	 * function Example() {
	 *   return (
	 *     <VStack css={[ui.background.darkGray, ui.padding(5)]}>
	 *       <Surface css={[ui.padding(5)]} variant="primary">
	 *         <Text>Primary Surface</Text>
	 *       </Surface>
	 *       <Surface css={[ui.padding(5)]} variant="secondary">
	 *         <Text>Secondary Surface</Text>
	 *       </Surface>
	 *       <Surface css={[ui.padding(5)]} variant="tertiary">
	 *         <Text>Tertiary Surface</Text>
	 *       </Surface>
	 *     </VStack>
	 *   );
	 * }
	 * ```
	 */
	variant?: SurfaceVariant;
};

/**
 * `Surface` is a core component that renders a primary background color.
 *
 * @remarks
 * In the example below, notice how the `Surface` renders in white (or dark gray if in dark mode).
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
export declare const Surface: PolymorphicComponent<SurfaceProps>;
