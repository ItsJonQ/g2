import * as React from 'react';
import { ConnectedProps } from './_shared';

export declare type SurfaceVariant = 'primary' | 'secondary' | 'tertiary';

export declare type SurfaceProps = {
	/**
	 *  Renders a border around the entire `Surface`.
	 */

	border?: boolean;
	/**
	 * Renders a top border.
	 */
	borderBottom?: boolean;
	/**
	 * Renders a top border.
	 */
	borderLeft?: boolean;
	/**
	 * Renders a top border.
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
 */
export declare const Surface: React.FC<SurfaceProps & ConnectedProps>;
