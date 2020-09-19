import { PolymorphicComponent } from './_shared';
import { FlexProps } from './Flex';

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
 */
export declare const ControlGroup: PolymorphicComponent<ControlGroupProps>;
