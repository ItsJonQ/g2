import { BackgroundInterface } from './backgrounds';
import { BorderInterface, BorderRadiusInterface } from './borders';
import { FontInterface } from './fonts';
import { OpacityInterface } from './opacity';
import { MarginInterface, PaddingInterface } from './spacing';
import { ShadowInterface } from './shadows';

/** Core system style presets. */
export declare const system: {
	/** Modify background styles based on system presets. */
	background: BackgroundInterface;
	/** Modify border radius styles based on system presets. */
	borderRadius: BorderRadiusInterface;
	/** Modify border styles based on system presets. */
	border: BorderInterface;
	/** Modify font styles based on system presets. */
	font: FontInterface;
	/** Modify margin styles based on system presets. */
	margin: MarginInterface;
	/** Modify opacity styles based on system presets. */
	opacity: OpacityInterface;
	/** Modify padding styles based on system presets. */
	padding: PaddingInterface;
	/** Modify box-shadow styles based on system presets. */
	shadow: ShadowInterface;
};
