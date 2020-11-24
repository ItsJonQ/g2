import { PolymorphicComponent, FormElementProps } from './_shared';
import { FlexProps } from './Flex';

export declare type BaseFieldProps = FlexProps &
	FormElementProps & {
		/**
		 * Renders a `cursor: pointer` on hover.
		 *
		 * @default false
		 */
		isClickable?: boolean;
		/**
		 * Renders focus styles.
		 *
		 * @default false
		 */
		isFocused?: boolean;
		/**
		 * Renders as an inline element (layout).
		 *
		 * @default false
		 */
		isInline?: boolean;
		/**
		 * Renders a subtle variant.
		 *
		 * @default false
		 */
		isSubtle?: boolean;
	};

/**
 * `BaseField` is a primitive component used to create form element components (e.g. `TextInput`).
 */
export declare const BaseField: PolymorphicComponent<'div', BaseFieldProps>;
