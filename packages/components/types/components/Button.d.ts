import { PolymorphicComponent } from './_shared';
import { BaseButtonProps } from './BaseButton';

export declare type ButtonVariant =
	| 'primary'
	| 'secondary'
	| 'tertiary'
	| 'plain'
	| 'link';

export declare type ButtonProps = BaseButtonProps & {
	/**
	 * Determines the `Button` variant to render.
	 *
	 * @default 'secondary'
	 */
	variant?: ButtonVariant;
};

/**
 * `Button` is a component used to trigger an action or event, such as submitting a Form, opening a Dialog, canceling an action, or performing a delete operation.
 *
 * @example
 * ```jsx
 * <Button variant="primary">Go</Button>
 * ```
 */
export declare const Button: PolymorphicComponent<ButtonProps, 'button'>;
