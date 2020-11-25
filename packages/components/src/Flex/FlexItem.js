import { createComponent } from '../utils';
import { useFlexItem } from './useFlexItem';

export default createComponent({
	as: 'div',
	useHook: useFlexItem,
	name: 'FlexItem',
});
