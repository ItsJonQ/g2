import { PolymorphicComponent } from './_shared';

export declare type ElevationProps = {
	/**
	 * Renders the active (interaction) shadow value.
	 */
	active?: number;
	/**
	 * Renders the border-radius of the shadow.
	 */
	borderRadius?: number | string;
	/**
	 * Renders the focus (interaction) shadow value.
	 */
	focus?: number;
	/**
	 * Renders the hover (interaction) shadow value.
	 */
	hover?: number;
	/**
	 * Determines if hover, active, and focus shadow values should be automatically calculated and rendered.
	 */
	isInteractive?: boolean;
	/**
	 * Dimensional offsets (margin) for the shadow.
	 */
	offset?: number;
	/**
	 * Size of the shadow, based on the Style system's elevation system.
	 */
	value?: number;
};

/**
 * `Elevation` is a core component that renders shadow, using the library's shadow system.
 */
export declare const Elevation: PolymorphicComponent<ElevationProps>;
