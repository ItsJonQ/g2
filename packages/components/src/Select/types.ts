import * as React from 'react';
import { Props as BaseFieldProps } from '../BaseField/useBaseField';
import { FormElementProps, SizeRangeReduced } from '../utils/types';

export type SelectOption = {
	id?: string;
	value: string;
	disabled?: boolean;
	label: string;
};

export type SelectOptionGroup = {
	id?: string;
	label: string;
	options: SelectOption[];
};

type MultipleProps = FormElementProps<string[]> & {
	/**
	 * Enables selection of multiple values.
	 */
	multiple: true;
	/**
	 * Value for the select element.
	 * An array of values is required for `multiple`.
	 */
	value: string[];
	onChange: (
		value: string[],
		extra?: { event: React.ChangeEvent<HTMLSelectElement> },
	) => void;
};

type SingluarProps = FormElementProps<string> & {
	/**
	 * Enables selection of multiple values.
	 */
	multiple: false | undefined;
	/**
	 * Value for the select element.
	 * An array of values is required for `multiple`.
	 */
	value: string;
	onChange: (
		value: string,
		extra?: { event: React.ChangeEvent<HTMLSelectElement> },
	) => void;
};

export type Props = Omit<BaseFieldProps, 'gap' | 'isClickable'> &
	(MultipleProps | SingluarProps) & {
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
		options?: (SelectOption | SelectOptionGroup)[];
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
		prefix?: React.ReactNode;
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
		suffix?: React.ReactNode;
	};
