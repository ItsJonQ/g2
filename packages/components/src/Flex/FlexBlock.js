import { createComponent } from '../utils';
import { useFlexBlock } from './useFlexBlock';

export default createComponent({
	as: 'div',
	useHook: useFlexBlock,
	name: 'FlexBlock',
});
