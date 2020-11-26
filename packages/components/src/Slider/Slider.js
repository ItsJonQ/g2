import { createComponent } from '../utils';
import { useSlider } from './useSlider';

/**
 * `Slider` is a form component lets users choose a value within a range.
 *
 * @example
 * ```jsx
 * import { Slider } from `@wp-g2/components`
 *
 * function Example() {
 *   return (
 *     <Slider />
 *   );
 * }
 * ```
 */
export default createComponent({
	as: 'input',
	useHook: useSlider,
	name: 'Slider',
});
