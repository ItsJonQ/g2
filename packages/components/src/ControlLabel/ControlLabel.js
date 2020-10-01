import { createComponent } from '../utils';
import { useControlLabel } from './useControlLabel';

export default createComponent({
	as: 'label',
	useHook: useControlLabel,
	name: 'ControlLabel',
});
