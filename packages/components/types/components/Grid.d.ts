import { PolymorphicComponent, CSS, ResponsiveCSSValue } from './_shared';

export declare type GridColumns = ResponsiveCSSValue<number>;

export declare type GridRows = ResponsiveCSSValue<number>;

export declare type GridProps = {
	/**
	 * Adjusts the block alignment of children.
	 */
	align?: CSS['alignItems'];
	/**
	 * Adjusts the number of columns of the `Grid`.
	 *
	 * @default 2
	 */
	columns?: GridColumns;
	/**
	 * Changes the CSS display from `grid` to `inline-grid`.
	 */
	isInline?: boolean;
	/**
	 * Gap between each child.
	 *
	 * @default 3
	 */
	gap?: number;
	/**
	 * Adjusts the inline alignment of children.
	 */
	justify?: CSS['justifyContent'];
	/**
	 * Adjusts the number of rows of the `Grid`.
	 */
	rows?: GridRows;
	/**
	 * Adjusts the CSS grid `template-columns`.
	 */
	templateColumns?: CSS['gridTemplateColumns'];
	/**
	 * Adjusts the CSS grid `template-rows`.
	 */
	templateRows?: CSS['gridTemplateRows'];
};

/**
 * `Grid` is a primitive layout component that can arrange content in a grid configuration.
 *
 * @example
 * ```jsx
 * import { Grid } from `@wp-g2/components`
 *
 * function Example() {
 *   return (
 *     <Grid columns={3}>
 *       <View css={[ui.background.blue]}>
 *         <Text>Ana</Text>
 *       </View>
 *       <View css={[ui.background.blue]}>
 *         <Text>Elsa</Text>
 *       </View>
 *       <View css={[ui.background.blue]}>
 *         <Text>Olaf</Text>
 *       </View>
 *     </Grid>
 *   );
 * }
 * ```
 */
export declare const Grid: PolymorphicComponent<GridProps>;
