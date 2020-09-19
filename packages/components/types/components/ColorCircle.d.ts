import * as React from 'react';
import { CSS, ConnectedProps } from './_shared';

export declare type ColorCircleSize = 'medium' | 'small';

export declare type ColorCircleProps = {
	/**
	 * Color to display.
	 */
	color?: CSS['color'];
	/**
	 * Determines the size of `ColorCircle`.
	 * @default 'medium'
	 */
	size?: ColorCircleSize;
};

/**
 * `ColorCircle` is a component that renders a color within a circle UI.
 */
export declare const ColorCircle: React.FC<ColorCircleProps & ConnectedProps>;
