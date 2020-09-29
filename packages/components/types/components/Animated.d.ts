import * as React from 'react';
import { PolymorphicComponent } from './_shared';

export declare type AnimatedProps = {
	/**
	 * Automatically render mount/unmount animations.
	 *
	 * @default false
	 */
	auto?: boolean;
	/**
	 * Properties to animate.
	 *
	 * @see https://www.framer.com/api/motion/animation/
	 */
	animate?: any;
	/**
	 * Automatically animate between layout changes.
	 *
	 * @see https://www.framer.com/api/motion/animation/#layout-animations
	 */
	layout?: boolean;
	/**
	 * Initial mounting style properties.
	 *
	 * @see https://www.framer.com/api/motion/animation/#mount-animations
	 */
	initial?: any;
	/**
	 * Animation variations with dedicated properties.
	 *
	 * @see https://www.framer.com/api/motion/animation/#variants
	 */
	variants?: any;
	/**
	 * Properties to transition.
	 *
	 * @see https://www.framer.com/api/motion/animation/#transitions
	 */
	transition?: any;
};

/**
 * `Animated` is a component capable of handling complex animations. `Animated` is powered by [Framer Motion](https://www.framer.com/api/motion/animation/).
 *
 * @example
 * ```jsx
 * <Animated auto layout>
 * 	<Card>...</Card>
 * </Animated>
 * ```
 *
 * @see
 * https://www.framer.com/api/motion/
 */
export declare const Animated: PolymorphicComponent<AnimatedProps>;

/**
 * `AnimatedContainer` manages and synchronizes inner `Animated` components. `AnimatedContainer` is necessary for handling unmount/exit animations.
 *
 * @example
 * ```jsx
 * <AnimatedContainer>
 * 	...
 * 	<Animated auto key="elsa">...</Animated>
 * 	<Animated auto key="ana">...</Animated>
 * 	...
 * </AnimatedContainer>
 * ```
 *
 * @see
 * https://www.framer.com/api/motion/animation/#shared-layout-animations
 */
export declare const AnimatedContainer: React.FC;
