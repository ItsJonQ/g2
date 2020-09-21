import { PolymorphicComponent } from './_shared';
import { FlexProps, FlexItemProps } from './Flex';

export declare type ControlGroupProps = FlexProps & {
	/**
	 * Renders inner control elements as (CSS) block elements.
	 *
	 * @default false
	 */
	isItemBlock?: boolean;
};

/**
 * `ControlGroup` is a layout component that contains control elements (e.g. `TextInput` or `Select`).
 *
 * @example
 * ```jsx
 * <ControlGroup>
 * 	<TextInput />
 * 	<Select />
 * 	<Button variant="primary" />
 * </ControlGroup>
 * ```
 */
export declare const ControlGroup: PolymorphicComponent<ControlGroupProps>;

export declare type ControlGroupItemProps = FlexItemProps & {};

/**
 * `ControlGroupItem` is a layout component that wraps control elements (e.g. `TextInput` or `Select`) used within `ControlGroup`.
 *
 * @example
 * ```jsx
 * <ControlGroup>
 * 	<ControlGroupItem>
 * 		<Text>...</Text>
 * 	</ControlGroupItem>
 * 	<Select />
 * </ControlGroup>
 * ```
 */
export declare const ControlGroupItem: PolymorphicComponent<ControlGroupItemProps>;
