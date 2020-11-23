import { createComponent } from '../utils';
import { useBackground } from './use-background';

export default createComponent({
	useHook: useBackground,
	name: 'Background',
});
