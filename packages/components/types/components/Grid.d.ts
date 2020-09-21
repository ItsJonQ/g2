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
	 *
	 * @example
	 * ```jsx
	 * <Grid templateColumns="1fr 300px 1fr" />
	 * ```
	 */
	templateColumns?: CSS['gridTemplateColumns'];
	/**
	 * Adjusts the CSS grid `template-rows`.
	 *
	 * @example
	 * ```jsx
	 * <Grid templateRows="1fr 300px 1fr" />
	 * ```
	 */
	templateRows?: CSS['gridTemplateRows'];
};

/**
 * `Grid` is a primitive layout component that can arrange content in a grid configuration.
 *
 * @example
 * ```jsx
 * <Grid columns={3}>
 * 	<View>...</View>
 * 	<View>...</View>
 * 	<View>...</View>
 * </Grid>
 * ```
 */
export declare const Grid: PolymorphicComponent<GridProps>;
