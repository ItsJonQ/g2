import { createComponent } from '../utils';
import { useFlex } from './useFlex';

export default createComponent({
	as: 'div',
	useHook: useFlex,
	name: 'Flex',
});
