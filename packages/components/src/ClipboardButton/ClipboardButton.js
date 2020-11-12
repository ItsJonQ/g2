import { contextConnect, useContextSystem } from '@wp-g2/context';
import { useClipboard } from '@wp-g2/utils';
import { noop } from 'lodash';
import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

import { Button } from '../Button';

function ClipboardButton(props, forwardedRef) {
	const {
		text,
		onClick: onClickProp = noop,
		onCopy: onCopyProp = noop,
		onFinishCopy = noop,
		...otherProps
	} = useContextSystem(props, 'ClipboardButton');
	const { hasCopied, onCopy } = useClipboard(text);
	const lastHasCopied = useRef(hasCopied);

	useEffect(() => {
		if (lastHasCopied.current === hasCopied) {
			return;
		}

		if (hasCopied) {
			onCopyProp();
		} else {
			onFinishCopy();
		}

		lastHasCopied.current = hasCopied;
	}, [hasCopied, onCopyProp, onFinishCopy]);

	const handleOnClick = (event) => {
		onClickProp(event);
		onCopy();
	};

	return (
		<Button {...otherProps} onClick={handleOnClick} ref={forwardedRef} />
	);
}

export default contextConnect(ClipboardButton, 'ClipboardButton');
