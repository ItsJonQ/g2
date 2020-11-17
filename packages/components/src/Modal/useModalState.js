import { useDialogState } from 'reakit';

export const useModalState = (args) =>
	useDialogState({ ...args, animated: true });
