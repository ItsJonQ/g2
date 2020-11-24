import { PolymorphicComponent } from './_shared';
import { TextInputArrow, TextInputProps } from './TextInput';

export declare type UnitInputProps = TextInputProps & {
	/**
	 * Renders specified incrementer/decrementer arrows.
	 *
	 * @default false
	 */
	arrow?: TextInputArrow;
	/**
	 * A CSS Prop used to validate the (unit) value.
	 */
	cssProp?: string;
};

/**
 * `UnitInput` is a form component that users can enter (CSS) unit values into.
 *
 * @example
 * ```jsx
 * import { UnitInput } from `@wp-g2/components`
 *
 * function Example() {
 *   return <UnitInput value="50%" min={0} max={100} />
 * }
 * ```
 */
export declare const UnitInput: PolymorphicComponent<'input', UnitInputProps>;
