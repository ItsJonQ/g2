import { useContextSystem } from '@wp-g2/context';

import { useSurface } from '../Surface';

export function useBackground(props) {
	const otherProps = useContextSystem(props, 'Background');
	const surfaceProps = useSurface({ variant: 'tertiary', ...otherProps });

	return surfaceProps;
}
