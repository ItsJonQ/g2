import * as React from 'react';
import { ConnectedProps, CSS } from './_shared';

export declare type GridColumns = Array<number | null> | number;

export declare type GridRows = Array<number | null> | number;

export declare type GridProps = {
	/**
	 * Adjusts the block alignment of children.
	 */
	align?: CSS['alignItems'];
	/**
	 * Adjusts the number of columns of the `Grid`.
	 */
	columns?: GridColumns;
	/**
	 * Changes the CSS display from `grid` to `inline-grid`.
	 */
	isInline?: boolean;
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
 */
export declare const Grid: React.FC<GridProps & ConnectedProps>;
