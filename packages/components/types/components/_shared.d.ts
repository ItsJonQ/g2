import { PropertiesFallback } from 'csstype';

export { PolymorphicComponent } from '@wp-g2/create-styles';

export type CSS = PropertiesFallback<number | string>;
export type ResponsiveCSSValue<T> = Array<T | null> | T;

export type FormElementProps = {
	/**
	 * The default (initial) state to use if `value` is undefined.
	 */
	defaultValue?: string | number | readonly string[] | undefined | boolean;
	/**
	 * Determines if element is disabled.
	 */
	disabled?: boolean;
	/**
	 * Label for the form element.
	 */
	label?: string;
	/**
	 * Value for the form element.
	 */
	value?: any;
};

export declare type SizeRangeDefault =
	| 'xLarge'
	| 'large'
	| 'medium'
	| 'small'
	| 'xSmall';

export declare type SizeRangeReduced = 'large' | 'medium' | 'small';

export declare type PopperPlacement =
	| 'auto'
	| 'auto-start'
	| 'auto-end'
	| 'top'
	| 'top-start'
	| 'top-end'
	| 'right'
	| 'right-start'
	| 'right-end'
	| 'bottom'
	| 'bottom-start'
	| 'bottom-end'
	| 'left'
	| 'left-start'
	| 'left-end';

export declare type PopperProps = {
	/**
	 * Position of the popover element.
	 *
	 * @default 'auto'
	 *
	 * @see https://popper.js.org/docs/v1/#popperplacements--codeenumcode
	 */
	placement?: PopperPlacement;
};
