import * as React from 'react';
import { ConnectedProps } from './_shared';
import { ButtonProps } from './Button';

export declare type CloseButtonProps = {
	/**
	 * @default 12
	 */
	iconSize: Pick<ButtonProps, 'iconSize'>;
	/**
	 * @default 'tertiary'
	 */
	variant: Pick<ButtonProps, 'variant'>;
};

/**
 * `CloseButton` is an action component used for dismissal actions.
 */
export declare const CloseButtonProps: React.FC<
	ConnectedProps & ButtonProps & CloseButtonProps
>;
