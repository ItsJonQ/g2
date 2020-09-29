import { createComponent } from '../utils';
import { useScrollable } from './useScrollable';

export default createComponent({
	useHook: useScrollable,
	namespace: 'Scrollable',
});
