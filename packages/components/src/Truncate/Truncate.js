import { createComponent } from '../utils';
import { useTruncate } from './useTruncate';

export default createComponent({
	as: 'span',
	useHook: useTruncate,
	name: 'Truncate',
});
