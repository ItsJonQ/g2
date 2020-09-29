import { createComponent } from '../utils';
import { useSurface } from './useSurface';

export default createComponent({
	useHook: useSurface,
	namespace: 'Surface',
});
