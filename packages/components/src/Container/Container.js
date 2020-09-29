import { createComponent } from '../utils';
import { useContainer } from './useContainer';

export default createComponent({
	useHook: useContainer,
	namespace: 'Container',
});
