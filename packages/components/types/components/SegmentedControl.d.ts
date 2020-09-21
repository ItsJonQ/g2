import {
	FormElementProps,
	PolymorphicComponent,
	SizeRangeDefault,
} from './_shared';

export declare type SegmentedControlProps = Omit<
	FormElementProps,
	'defaultValue'
> & {
	/**
	 * ID that will serve as a base for all the items IDs.
	 *
	 * @see https://reakit.io/docs/radio/#useradiostate
	 */
	baseId?: string;
	/**
	 * Determines if segments should be rendered with equal widths.
	 *
	 * @default false
	 */
	isAdaptiveWidth?: boolean;
	/**
	 * Renders `SegmentedControl` is a (CSS) block element.
	 *
	 * @default false
	 */
	isBlock?: boolean;
	/**
	 * Options to render within `SegmentedControl`.
	 *
	 * @example
	 * ```jsx
	 * const options = [
	 *  { id: 'elsa', value: 'elsa', label: 'Elsa' },
	 *  { id: 'ana', value: 'ana', label: 'Ana' },
	 * ]
	 *
	 * const Heroes = <SegmentedControl options={options} />
	 * ```
	 */
	options?: Array<unknown>;
	/**
	 * Callback when a segment is selected.
	 */
	onChange?: (...args: any) => void;
	/**
	 * Determines the size of `SegmentedControl`.
	 *
	 * @default 'medium'
	 */
	size?: SizeRangeDefault;
};

/**
 * `SegmentedControl` is a form component that lets users choose options represented in horizontal segments.
 *
 * @example
 * ```jsx
 * <SegmentedControl options={[...]} />
 * ```
 */
export declare const SegmentedControl: PolymorphicComponent<
	SegmentedControlProps,
	'input'
>;
