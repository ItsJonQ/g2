import { useDialogState } from '@wp-g2/a11y';

export const useModalState = (args) =>
	useDialogState({ ...args, animated: true });
