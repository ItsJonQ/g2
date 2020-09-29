import { createComponent } from '../utils';
import { useGrid } from './useGrid';

export default createComponent({
	useHook: useGrid,
	namespace: 'Grid',
});
