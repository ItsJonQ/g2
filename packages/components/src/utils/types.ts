import { As } from 'reakit-utils/types';
import { ViewOwnProps, PropsFromViewOwnProps } from '@wp-g2/create-styles';

export type Options<T extends As, P extends ViewOwnProps<{}, T>> = {
	as: T;
	name: string;
	useHook: (props: P) => any;
	memo?: boolean;
};

export type ResponsiveCSSValue<T> = Array<T | undefined> | T;

export type SizeRangeDefault =
	| 'xLarge'
	| 'large'
	| 'medium'
	| 'small'
	| 'xSmall';

export type SizeRangeReduced = 'large' | 'medium' | 'small';

export type FormElementProps<V> = {
	/**
	 * The default (initial) state to use if `value` is undefined.
	 */
	defaultValue?: V;
	/**
	 * Determines if element is disabled.
	 */
	disabled?: boolean;
	/**
	 * Label for the form element.
	 */
	label?: string;
};

export type PopperPlacement =
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

export type PopperProps = {
	/**
	 * Position of the popover element.
	 *
	 * @default 'auto'
	 *
	 * @see https://popper.js.org/docs/v1/#popperplacements--codeenumcode
	 */
	placement?: PopperPlacement;
};
