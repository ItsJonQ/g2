import { createComponent } from '../utils';
import { useSlider } from './useSlider';

export default createComponent({
	as: 'input',
	useHook: useSlider,
	name: 'Slider',
});
