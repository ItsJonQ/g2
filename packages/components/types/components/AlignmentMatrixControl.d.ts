import { PolymorphicComponent } from './_shared';

type Value =
	| 'top left'
	| 'top center'
	| 'top right'
	| 'center left'
	| 'center center'
	| 'center right'
	| 'bottom left'
	| 'bottom center'
	| 'bottom right';

export declare type AlignmentMatrixControlProps = {
	/**
	 * Optional className to pass to the
	 */
	className?: string;
	/**
	 * The current value.
	 */
	value: Value;
	/**
	 *
	 */
	defaultValue?: Value;
	/**
	 *
	 */
	onChange?: (value: Value) => void;
};

export declare const AlignmentMatrixControl: PolymorphicComponent<
	'div',
	AlignmentMatrixControlProps
>;
