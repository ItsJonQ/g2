import { createComponent } from '../utils';
import { useBaseField } from './useBaseField';

/**
 * `BaseField` is a primitive component used to create form element components (e.g. `TextInput`).
 */
export default createComponent({
	as: 'div',
	useHook: useBaseField,
	name: 'BaseField',
});
