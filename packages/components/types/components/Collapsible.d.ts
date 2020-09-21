import { PolymorphicComponent } from './_shared';

export declare type CollapsibleProps = {
	/**
	 * ID that will serve as a base for all the items IDs.
	 *
	 * @see https://reakit.io/docs/disclosure/#usedisclosurestate
	 */
	baseId?: string;
	/**
	 * Callback for when the `visible` state changes.
	 */
	onVisibleChange?: (...args: any) => void;
	/**
	 * Whether `Collapsible` is open.
	 */
	visible?: boolean;
};

/**
 * `Collapsible` is a layout component that controls visibility of a section of content.
 *
 * @example
 * ```jsx
 * <Collapsible>
 * 	<CollapsibleTrigger>Toggle</CollapsibleTrigger>
 * 	<CollapsibleContent>...</CollapsibleContent>
 * </Collapsible>
 * ```
 */
export declare const Collapsible: PolymorphicComponent<CollapsibleProps>;

export declare type CollapsibleTriggerProps = {
	/**
	 * Renders in a disabled state.
	 */
	disabled?: boolean;
	/**
	 * When an element is disabled, it may still be focusable. It works similarly to readOnly on form elements. In this case, only aria-disabled will be set.
	 *
	 * @see https://reakit.io/docs/disclosure/#disclosure
	 */
	focusable?: boolean;
};

/**
 * `CollapsibleTrigger` is a layout component that toggles the visible of a `Collapsible` section.
 *
 * @example
 * ```jsx
 * <Collapsible>
 * 	<CollapsibleTrigger>Toggle</CollapsibleTrigger>
 * 	<CollapsibleContent>...</CollapsibleContent>
 * </Collapsible>
 * ```
 */
export declare const CollapsibleTrigger: PolymorphicComponent<CollapsibleTriggerProps>;

export declare type CollapsibleContentProps = {};

/**
 * `CollapsibleContent` is a layout component that contains the content of a `Collapsible` section.
 *
 * @example
 * ```jsx
 * <Collapsible>
 * 	<CollapsibleTrigger>Toggle</CollapsibleTrigger>
 * 	<CollapsibleContent>...</CollapsibleContent>
 * </Collapsible>
 * ```
 */
export declare const CollapsibleContent: PolymorphicComponent<CollapsibleContentProps>;
