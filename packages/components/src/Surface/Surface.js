import { createComponent } from '../utils';
import { useSurface } from './useSurface';

export default createComponent({
	as: 'div',
	useHook: useSurface,
	name: 'Surface',
});
