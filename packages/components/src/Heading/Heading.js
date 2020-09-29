import { createComponent } from '../utils';
import { useHeading } from './useHeading';

export default createComponent({
	useHook: useHeading,
	namespace: 'Heading',
});
