import * as React from 'react';
import { ConnectedProps, FormElementProps } from './_shared';
import { FlexProps } from './Flex';
import { GridProps } from './Grid';

export declare type RadioProps = {
	/**
	 * The checked state for `Radio`.
	 */
	checked?: boolean;
	/**
	 * When an element is disabled, it may still be focusable. It works similarly to readOnly on form elements.
	 * In this case, only aria-disabled will be set.
	 * @see https://reakit.io/docs/radio/#radio
	 */
	focusable?: boolean;
	/**
	 * Form label for `Radio`.
	 */
	label?: string;
	/**
	 * Value of `Radio`.
	 */
	value?: string | number;
};

/**
 * `Radio` is a form component gives users a way to make a single selection.
 */
export declare const Radio: React.FC<
	RadioProps &
		ConnectedProps &
		FormElementProps &
		Pick<FlexProps, 'gap'> &
		Pick<GridProps, 'templateColumns'>
>;
