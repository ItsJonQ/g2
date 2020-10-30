import { useContextSystem } from '@wp-g2/context';

export function useBaseChoice(props, namespace = 'BaseChoice') {
	const {
		gap,
		help,
		label,
		labelHidden,
		spacing = 1,
		templateColumns = 'auto 1fr',
		truncate = true,
		...otherProps
	} = useContextSystem(props, namespace);

	const baseChoice = {
		gap,
		help,
		label,
		labelHidden,
		templateColumns,
		spacing,
		truncate,
	};

	return {
		...otherProps,
		baseChoice,
	};
}
