import { createComponent } from '../utils';
import { useBackground } from './useBackground';

export default createComponent({
	useHook: useBackground,
	name: 'Background',
});
