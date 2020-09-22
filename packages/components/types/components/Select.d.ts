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
		 *	const options = [
		 *  	{ id: 'elsa', value: 'elsa', label: 'Elsa' },
		 *  	{ id: 'ana', value: 'ana', label: 'Ana' },
		 * 	]
		 *
		 * 	return <Select options={options} />
		 * }
		 * ```
		 */
		options?: Array<unknown>;
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
		size?: SizeRangeDefault;
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
