import { PolymorphicComponent, CSS } from './_shared';
import { FlexProps } from './Flex';

export declare type ControlGroupProps = Pick<FlexProps, 'direction'> & {
	/**
	 * Adjust the layout (width) of content using CSS grid (`grid-template-columns`).
	 *
	 * @example
	 * ```jsx
	 * import { Button, ControlGroup, Select, TextInput } from `@wp-g2/components`
	 * import { ui } from `@wp-g2/styles`
	 *
	 * function Example() {
	 *   return (
	 *     <ControlGroup templateColumns="auto 1fr auto">
	 *       <Select />
	 *       <TextInput placeholder="First name" />
	 *       <Button variant="primary" />
	 *     </ControlGroup>
	 *   );
	 * }
	 * ```
	 */
	templateColumns?: CSS['gridTemplateColumns'];
};

/**
 * `ControlGroup` is a layout component that contains control elements (e.g. `TextInput` or `Select`).
 *
 * @example
 * ```jsx
 * import { Button, ControlGroup, TextInput } from `@wp-g2/components`
 * import { ui } from `@wp-g2/styles`
 *
 * function Example() {
 *   return (
 *     <ControlGroup>
 *       <TextInput placeholder="First name" />
 *       <Button variant="primary" />
 *     </ControlGroup>
 *   );
 * }
 * ```
 */
export declare const ControlGroup: PolymorphicComponent<
	'div',
	ControlGroupProps
>;
