import * as React from 'react';
import {
	PolymorphicComponent,
	FormElementProps,
	SizeRangeDefault,
} from './_shared';
import { BaseFieldProps } from './BaseField';

export declare type SelectProps = Omit<
	BaseFieldProps,
	'gap' | 'isClickable' | 'isFocused'
> &
	FormElementProps & {
		/**
		 * Options to render within `Select`.
		 */
		options?: Array<unknown>;
		/**
		 * Renders prefix content within `Select`.
		 */
		prefix?: React.Component;
		/**
		 * Determines the size of `Select`.
		 */
		size?: SizeRangeDefault;
		/**
		 * Renders prefix content within `Select`.
		 */
		suffix?: React.Component;
	};

/**
 * `Select` is a form component lets users choose options from an options menu.
 */
export declare const Select: PolymorphicComponent<SelectProps, 'select'>;
