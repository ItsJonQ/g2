import { PolymorphicComponent } from './_shared';
import { ButtonProps } from './Button';

export declare type CloseButtonProps = ButtonProps & {
	/**
	 *
	 * @default 12
	 */
	iconSize: Pick<ButtonProps, 'iconSize'>;
	/**
	 *
	 * @default 'tertiary'
	 */
	variant: Pick<ButtonProps, 'variant'>;
};

/**
 * `CloseButton` is an action component used for dismissal actions.
 *
 * @example
 * ```jsx
 * <CloseButton />
 * ```
 */
export declare const CloseButtonProps: PolymorphicComponent<
	'button',
	CloseButtonProps
>;
