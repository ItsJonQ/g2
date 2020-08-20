import copy from 'copy-to-clipboard';
import { useCallback, useEffect, useState } from 'react';

/**
 * Source:
 * https://github.com/chakra-ui/chakra-ui/blob/master/packages/hooks/src/use-clipboard.ts
 */

export function useClipboard(text, timeout = 1500) {
	const [hasCopied, setHasCopied] = useState(false);

	const onCopy = useCallback(() => {
		const didCopy = copy(text);
		setHasCopied(didCopy);
	}, [text]);

	useEffect(() => {
		if (hasCopied) {
			const id = setTimeout(() => {
				setHasCopied(false);
			}, timeout);

			return () => clearTimeout(id);
		}
	}, [timeout, hasCopied]);

	return { hasCopied, onCopy, value: text };
}
