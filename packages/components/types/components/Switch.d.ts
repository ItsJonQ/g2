import * as React from 'react';
import { ConnectedProps, FormElementProps } from './_shared';
import { BadgeProps } from './Badge';

export declare type SwitchSize = 'large' | 'medium' | 'small';

export declare type SwitchProps = {
	/**
	 * The checked (on/off) state of `Switch`.
	 */
	checked?: boolean;
	/**
	 * Determines the size of `Switch`.
	 */
	size?: SwitchSize;
	/**
	 * Renders as a checkbox input or a radio input.
	 */
	type?: 'checkbox' | 'radio';
};

/**
 * `Switch` is a form component that toggles a checked (on/off) state.
 */
export declare const Switch: React.FC<
	SwitchProps &
		ConnectedProps &
		FormElementProps &
		Pick<BadgeProps, 'color' | 'display'>
>;
