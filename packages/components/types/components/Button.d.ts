import { PolymorphicComponent, CSS, SizeRangeDefault } from './_shared';

export declare type ButtonSize = SizeRangeDefault;

export declare type ButtonVariant =
	| 'primary'
	| 'secondary'
	| 'tertiary'
	| 'plain'
	| 'link';

export declare type ButtonProps = {
	/**
	 * Renders `Button` in a disabled state.
	 *
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Renders `Elevation` styles for the `Button`.
	 *
	 * @default 0
	 */
	elevation?: number;
	/**
	 * Renders `Elevation` styles for the `Button` when active.
	 */
	elevationActive?: number;
	/**
	 * Renders `Elevation` styles for the `Button` when focused.
	 */
	elevationFocus?: number;
	/**
	 * Renders `Elevation` styles for the `Button` when hovered.
	 */
	elevationHover: number;
	/**
	 * The amount of space between each child element within `Button`.
	 *
	 * @default 2
	 */
	gap?: number;
	/**
	 * Determines if a caret `Icon` should render within the `Button`
	 *
	 * @default false
	 */
	hasCaret?: boolean;
	/**
	 * An HTML anchor link. Transforms the `Button` in a `<a>` element.
	 */
	href?: string;
	/**
	 * Renders an `Icon` within the `Button`.
	 */
	icon?: React.Component;
	/**
	 * Adjusts the size of the `Icon` within the `Button` (from the `icon` prop).
	 */
	iconSize?: number;
	/**
	 * Determines if `Button` should render as a block element, rather than inline.
	 *
	 * @default false
	 */
	isBlock?: boolean;
	/**
	 * Renders `Button` with control styles, similar to `TextInput` or `Select`.
	 *
	 * @default false
	 */
	isControl?: boolean;
	/**
	 * Renders destructive variant.
	 *
	 * @default false
	 */
	isDestructive?: boolean;
	/**
	 * Renders loading, disabling `Button` and renders a `Spinner`.
	 *
	 * @default false
	 */
	isLoading?: boolean;
	/**
	 * Renders a narrower `Button`.
	 *
	 * @default false
	 */
	isNarrow?: boolean;
	/**
	 * Renders a rounded `Button`.
	 *
	 * @default false
	 */
	isRounded?: boolean;
	/**
	 * Renders a subtle `Button`.
	 *
	 * @default false
	 */
	isSubtle?: boolean;
	/**
	 * Determines how inner content is aligned.
	 *
	 * @default 'center'
	 */
	justify?: CSS['justifyContent'];
	/**
	 * Determines if inner content should be wrapped.
	 *
	 * @default false
	 */
	noWrap?: boolean;
	/**
	 * Renders prefix content within `Button`.
	 */
	prefix?: React.Component;
	/**
	 * Determines the size of `Button`.
	 *
	 * @default 'medium'
	 */
	size?: ButtonSize;
	/**
	 * Renders suffix content within `Button`.
	 */
	suffix?: React.Component;
	/**
	 * Modifies the text-align (CSS) styles of `Button` content.
	 *
	 * @default 'center'
	 */
	textAlign?: CSS['textAlign'];
	/**
	 * Determines the `Button` variant to render.
	 *
	 * @default 'secondary'
	 */
	variant?: ButtonVariant;
};

/**
 * `Button` is a component used to trigger an action or event, such as submitting a Form, opening a Dialog, canceling an action, or performing a delete operation.
 */
export declare const Button: PolymorphicComponent<ButtonProps, 'button'>;
