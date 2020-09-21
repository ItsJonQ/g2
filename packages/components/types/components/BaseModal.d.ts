import * as React from 'react';
import { CSS, PolymorphicComponent, SizeRangeReduced } from './_shared';

export declare type BaseModalProps = {
	/**
	 * The animation duration for the backdrop element.
	 *
	 * @default 250
	 */
	backdropTransitionDuration?: number;
	/**
	 * The aria-label for the Modal for screen-readers.
	 *
	 * @see https://reakit.io/docs/dialog/
	 */
	label?: string;
	/**
	 * The trigger element to open/close `Modal` when clicked.
	 *
	 * @example
	 * ```jsx
	 * <Modal trigger={<Button>Open Modal</Button>}>
	 *   ...
	 * </Modal>
	 * ```
	 */
	trigger?: React.Component;
	/**
	 * The duration for the `Modal` open/closing animations.
	 *
	 * @default 200
	 */
	transitionDuration?: number;
	/**
	 * The easing (timing-function) for the `Modal` open/closing animations.
	 *
	 * @default 'ease-in-out'
	 */
	transitionTimingFunction?: CSS['transitionTimingFunction'];
	/**
	 * Whether `Modal` is visible.
	 *
	 * @default false
	 *
	 * @see https://reakit.io/docs/dialog/#usedialogstate
	 */
	visible?: boolean;
	/**
	 * The z-index layer value for `Modal`.
	 */
	zIndex?: CSS['zIndex'];
};

/**
 * `BaseModal` is a primitive component used to create modal dialog elements.
 */
export declare const BaseModal: PolymorphicComponent<BaseModalProps>;
