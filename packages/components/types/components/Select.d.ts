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
		 *
		 * @example
		 * ```jsx
		 * const options = [
		 *  { id: 'elsa', value: 'elsa', label: 'Elsa' },
		 *  { id: 'ana', value: 'ana', label: 'Ana' },
		 * ]
		 *
		 * const Heroes = <Select options={options} />
		 * ```
		 */
		options?: Array<unknown>;
		/**
		 * Renders prefix content within `Select`.
		 */
		prefix?: React.Component;
		/**
		 * Determines the size of `Select`.
		 *
		 * @default 'medium'
		 */
		size?: SizeRangeDefault;
		/**
		 * Renders prefix content within `Select`.
		 */
		suffix?: React.Component;
	};

/**
 * `Select` is a form component lets users choose options from an options menu.
 *
 * @example
 * ```jsx
 * <Select value={value} onChange={setValue}>
 * 	<option>...</option>
 * 	<option>...</option>
 * </Select>
 * ```
 */
export declare const Select: PolymorphicComponent<SelectProps, 'select'>;
