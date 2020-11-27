import { createComponent } from '../utils';
import { useHeading } from './useHeading';

/**
 * `Heading` renders headings and titles using the library's typography system.
 *
 * @example
 * ```jsx
 * import { Heading } from `@wp-g2/components`
 *
 * function Example() {
 *   return <Heading>Into The Unknown</Heading>;
 * }
 * ```
 */
const Heading = createComponent({
	as: 'div',
	useHook: useHeading,
	name: 'Heading',
});

export default Heading;
