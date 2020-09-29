import { createComponent } from '../utils';
import { useText } from './useText';

export default createComponent({
	as: 'span',
	useHook: useText,
	namespace: 'Text',
});
