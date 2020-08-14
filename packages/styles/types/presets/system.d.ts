import { CSSClassName } from '../shared';

import { AnimationInterface } from './animations';
import { BackgroundInterface } from './backgrounds';
import { BorderInterface, BorderRadiusInterface } from './borders';
import { FontInterface } from './fonts';
import { OpacityInterface } from './opacity';
import { OffsetInterface } from './offsets';
import { MarginInterface, PaddingInterface } from './spacing';
import { ShadowInterface } from './shadows';

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
	/** Applies custom modifiers based on an active interaction. */
	active: ActiveInterface;
	/** Applies custom animation styles based on system presets. */
	animation: AnimationInterface;
	/** Modify background styles based on system presets. */
	background: BackgroundInterface;
	/** Modify border radius styles based on system presets. */
	borderRadius: BorderRadiusInterface;
	/** Modify border styles based on system presets. */
	border: BorderInterface;
	/** Applies custom modifiers based on an focus interaction. */
	focus: FocusInterface;
	/** Applies custom modifiers based on an hover interaction. */
	hover: HoverInterface;
	/** Modify font styles based on system presets. */
	font: FontInterface;
	/** Modify margin styles based on system presets. */
	margin: MarginInterface;
	/** Modify offset (transform) styles based on system presets. */
	offset: OffsetInterface;
	/** Modify opacity styles based on system presets. */
	opacity: OpacityInterface;
	/** Modify padding styles based on system presets. */
	padding: PaddingInterface;
	/** Modify box-shadow styles based on system presets. */
	shadow: ShadowInterface;
}

/** Core system style presets. */
export declare const system: SystemInterface;
/** Core system style presets. */
export declare const ui: SystemInterface;
