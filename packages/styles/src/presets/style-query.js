import { COMPONENT_NAMESPACE } from '../namespaces';
import { css } from '../style-system';

/**
 * An experimental preset that allows for custom styling of components.
 * This is achieved by leveraging the namespacing system. The provided
 * css() method (which is the same as the one used in the style system)
 * targets the namespace, adding the CSS rules to that selector.
 *
 * @example
 * ```jsx
 * <View css={[ui.$('Button').css('transform: scale(2)')]}>
 *   <Button />
 * </View>
 * ```
 *
 * The StyleQuery class enables a more seamless workflow for namespace declaration
 * within a component as well as declaring CSS rules using a "chaining"
 * API, similar to jQuery.
 */
class StyleQuery {
	constructor(ComponentName) {
		this[COMPONENT_NAMESPACE] = ComponentName;

		return this;
	}
}

/**
 * @return {string}
 */
StyleQuery.prototype.getSelector = function () {
	return `[${COMPONENT_NAMESPACE}="${this[COMPONENT_NAMESPACE]}"]`;
};

/**
 * @param {Parameters<css>} args
 * @return {string}
 */
StyleQuery.prototype.css = function (...args) {
	const compiledStyles = css(...args);

	/**
	 * Currently does not support hoisting (e.g. dark-mode).
	 */
	return css`
		${this.getSelector()} {
			${compiledStyles};
		}
	`;
};

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
 * @returns {StyleQuery} The StyleQuery instance.
 */
const createStyleQuery = (ComponentName) => new StyleQuery(ComponentName);

// Alias
export const $ = createStyleQuery;
