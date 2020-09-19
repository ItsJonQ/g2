import * as React from 'react';
import { ConnectedProps } from './_shared';
import { BadgeProps } from './Badge';

export declare type TagProps = Pick<BadgeProps, 'color' | 'display'> & {
	/**
	 * A link for `Tag`.
	 */
	href?: string;
	/**
	 * Callback when the remove button is clicked.
	 */
	onRemove?: (...args: any) => void;
	/**
	 * Title label for the remove actions. Enables the remove action when defined.
	 */
	removeButtonText?: string;
};

/**
 * `Tag` is a component that labels UI objects for navigation and context.
 */
export declare const Tag: React.FC<ConnectedProps & TagProps>;
