import * as React from 'react';
import { CSS, ConnectedProps } from './_shared';

export declare type SpinnerProps = {
	/**
	 * Color of `Spinner`.
	 */
	color?: CSS['color'];
	/**
	 * Size of `Spinner`.
	 * @default 16
	 */
	size?: number;
};

/**
 * `Spinner` is a component that notifies users that an action is being processed.
 */
export declare const Spinner: React.FC<SpinnerProps & ConnectedProps>;
