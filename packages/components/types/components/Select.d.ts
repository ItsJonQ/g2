import * as React from 'react';
import {
	PolymorphicComponent,
	FormElementProps,
	SizeRangeReduced,
} from './_shared';
import { BaseFieldProps } from './BaseField';

type SelectOption = {
	id?: string;
	value: string;
	disabled?: boolean;
	label: string;
};

type SelectOptionGroup = {
	id?: string;
	label: string;
	options: Array<SelectOption>;
};

export declare type SelectProps = Omit<
	BaseFieldProps,
	'gap' | 'isClickable' | 'isFocused'
> &
	FormElementProps & {
		/**
		 * @example
		 * ```jsx
		 * import { Select, Text } from `@wp-g2/components`
		 *
		 * function Example() {
		 * 	return <Select size="small"><option>Ana</option></Select>
		 * }
		 * ```
		 */
		isSubtle?: boolean;
		/**
		 * Enables selection of multiple values.
		 */
		multiple?: boolean;
		/**
		 * Options to render within `Select`.
		 *
		 * @example
		 * ```jsx
		 * import { Select } from `@wp-g2/components`
		 *
		 * function Example() {
		 * 	const options = [
		 * 		{ id: 'elsa', value: 'elsa', label: 'Elsa' },
		 * 		{ id: 'ana', value: 'ana', label: 'Ana' },
		 * 	]
		 *
		 * 	return <Select options={options} />
		 * }
		 * ```
		 *
		 * To render options in groups (`optgroup`), provide a collection of objects
		 * with `label` and `options` properties.
		 *
		 * @example
		 * ```jsx
		 * import { Select } from `@wp-g2/components`
		 *
		 * function Example() {
		 * 	const options = [
		 * 		{
		 * 			label: 'Frozen',
		 * 			options: [
		 * 				{
		 * 					label: 'Into The Unknown',
		 * 					value: 'into-the-unknown',
		 * 				},
		 * 			],
		 * 		},
		 * 		{
		 * 			label: 'Frozen 2',
		 * 			options: [
		 * 				{
		 * 					label: 'Into The Unknown',
		 * 					value: 'into-the-unknown',
		 * 				},
		 * 			],
		 * 		},
		 * 	];
		 *
		 * 	return <Select options={options} />
		 * }
		 * ```
		 */
		options?: Array<SelectOption | SelectOptionGroup>;
		/**
		 * Example text to display as placeholder.
		 */
		placeholder?: string;
		/**
		 * Renders prefix content within `Select`.
		 *
		 * @example
		 * ```jsx
		 * import { Select, Text } from `@wp-g2/components`
		 *
		 * function Example() {
		 * 	return <Select prefix={<Text>Before</Text>} />
		 * }
		 * ```
		 */
		prefix?: React.ReactElement;
		/**
		 * Determines the size of `Select`.
		 *
		 * @default 'medium'
		 *
		 * @example
		 * ```jsx
		 * import { Select, Text } from `@wp-g2/components`
		 *
		 * function Example() {
		 * 	return <Select size="small"><option>Ana</option></Select>
		 * }
		 * ```
		 */
		size?: SizeRangeReduced;
		/**
		 * Renders prefix content within `Select`.
		 *
		 * @example
		 * ```jsx
		 * import { Select, Text } from `@wp-g2/components`
		 *
		 * function Example() {
		 * 	return <Select suffix={<Text>After</Text>} />
		 * }
		 * ```
		 */
		suffix?: React.ReactElement;
		/**
		 * Value for the select element.
		 * An array of values is required for `multiple`.
		 */
		value?: string | Array<string>;
	};

/**
 * `Select` is a form component lets users choose options from an options menu.
 *
 * @example
 * ```jsx
 * import { Select } from `@wp-g2/components`
 *
 * function Example() {
 *   return (
 *     <Select>
 *       <option>Ana</option>
 *       <option>Elsa</option>
 *       <option>Kristoff</option>
 *       <option>Olaf</option>
 *     </Select>
 *   );
 * }
 * ```
 */
export declare const Select: PolymorphicComponent<SelectProps, 'select'>;
