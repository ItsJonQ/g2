import { createComponent } from '../utils';
import { useLink } from './useLink';

export default createComponent({
	as: 'a',
	useHook: useLink,
	name: 'Link',
});
