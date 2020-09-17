import { Emotion } from 'create-emotion';
import { COMPONENT_NAMESPACE } from '../../src/namespaces';

interface StyleQueryInstanceInterface {
	/**
	 * The Component namespace as an HTML attribute.
	 */
	[COMPONENT_NAMESPACE]: string;
	css: Emotion['css'];
}

/** Creates a style query for a Component. */
export declare interface StyleQueryInterface {
	/**
	 * Creates a style query for a Component. This namespace can be added to any
	 * React component, allowing it to be targeted for custom style via
	 * ui.$().css().
	 *
	 * @example
	 * ```jsx
	 * // Declaring a namespace for a component
	 * <View {...ui.$('Olaf')} />
	 * ```
	 *
	 * @example
	 * ```jsx
	 * // Targeting a namespaced component for styling
	 * <View css={[ui.$('Olaf').css('background: white')]} />
	 *   <View {...ui.$('Olaf')} />
	 * </View/>
	 * ```
	 *
	 * @param {string} ComponentName The namespace of the component
	 */
	(ComponentName: string): StyleQueryInstanceInterface;
}
