import { CSSClassName } from '../shared';

import { AlignmentInterface } from './alignments';
import { AnimationInterface } from './animations';
import { BackgroundInterface } from './backgrounds';
import { BorderInterface, BorderRadiusInterface } from './borders';
import { ColorInterface } from './colors';
import { FrameInterface } from './dimensions';
import { FontInterface } from './fonts';
import { GetInterface } from './get';
import { ModesInterface } from './modes';
import { OpacityInterface } from './opacity';
import { PositionInterface } from './positions';
import { SpaceInterface } from './space';
import { MarginInterface, PaddingInterface } from './spacing';
import { ShadowInterface } from './shadows';
import { StyleQueryInterface } from './styleQuery';
import {
	OffsetInterface,
	ScaleInterface,
	ScaleXInterface,
	ScaleYInterface,
	RotateInterface,
} from './transforms';
import { ValueInterface } from './values';
import { ZIndexInterface } from './zIndex';

declare interface InteractionInterface {
	/** Applies custom modifiers based on an interaction. */
	(...styles: SystemInterface[]): CSSClassName;
}

/** Applies custom modifiers based on an hover interaction. */
declare interface HoverInterface extends InteractionInterface {}
/** Applies custom modifiers based on an active interaction. */
declare interface ActiveInterface extends InteractionInterface {}
/** Applies custom modifiers based on an focus interaction. */
declare interface FocusInterface extends InteractionInterface {}

export declare interface SystemInterface {
	/** Creates a style query for a Component. */
	$: StyleQueryInterface;
	/**
	 * Applies custom modifiers based on an active interaction.
	 *
	 * @example
	 * ```js
	 * const styles = css(ui.active({ color: ui.color.black }))
	 * ```
	 */
	active: ActiveInterface;
	/** Modify alignment styles based on system presets. */
	alignment: AlignmentInterface;
	/** Applies custom animation styles based on system presets. */
	animation: AnimationInterface;
	/** Modify background styles based on system presets. */
	background: BackgroundInterface;
	/** Modify border radius styles based on system presets. */
	borderRadius: BorderRadiusInterface;
	/** Modify border styles based on system presets. */
	border: BorderInterface;
	/**
	 * Get a color value.
	 * @alias ui.values.color
	 */
	color: ColorInterface;
	/**
	 * Applies custom modifiers based on an focus interaction.
	 *
	 * @example
	 * ```js
	 * const styles = css(ui.focus({ color: ui.color.black }));
	 * ```
	 */
	focus: FocusInterface;
	/** Modify width/height styles. */
	frame: FrameInterface;
	/** Modify font styles based on system presets. */
	font: FontInterface;
	/**
	 * Applies custom modifiers based on an hover interaction.
	 *
	 * @example
	 * ```js
	 * const styles = css(ui.hover({ color: ui.color.black }));
	 * ```
	 */
	hover: HoverInterface;
	/**
	 * Retrives a design token value from the style configuration.
	 *
	 * @example
	 * ```js
	 * const controlHeight = ui.get('controlHeight');
	 * ```
	 */
	get: GetInterface;
	/** Modify margin styles based on system presets. */
	margin: MarginInterface;
	/** Modify styles for a specific mode. */
	mode: ModesInterface;
	/** Modify offset (transform) styles. */
	offset: OffsetInterface;
	/** Modify opacity styles based on system presets. */
	opacity: OpacityInterface;
	/** Modify padding styles based on system presets. */
	padding: PaddingInterface;
	/** Modify position styles based on system presets. */
	position: PositionInterface;
	/** Modify rotate (transform) styles. */
	rotate: RotateInterface;
	/** Modify scale (transform) styles. */
	scale: ScaleInterface;
	/** Modify scaleX (transform) styles. */
	scaleX: ScaleXInterface;
	/** Modify scaleY (transform) styles. */
	scaleY: ScaleYInterface;
	/**
	 * Calculates a value based on the grid system.
	 * @alias ui.values.space
	 */
	space: SpaceInterface;
	/** Modify box-shadow styles based on system presets. */
	shadow: ShadowInterface;
	/** Outputs a CSS number value, often with a unit. */
	value: ValueInterface;
	/**
	 * Modify z-index styles based on system presets.
	 *
	 * @example
	 * ```js
	 * const modalStyles = css(ui.zIndex('Modal'))
	 * ```
	 */
	zIndex: ZIndexInterface;
}

/** Core system style presets. */
export declare const ui: SystemInterface;
