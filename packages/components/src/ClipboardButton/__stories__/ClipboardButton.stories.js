import React from 'react';

import { ClipboardButton } from '../index';

export default {
	component: ClipboardButton,
	title: 'Components/ClipboardButton',
};

const Example = () => {
	const [hasCopied, setHasCopied] = React.useState(false);
	const [hasFinishedCopying, setHasFinishedCopying] = React.useState(false);

	return (
		<>
			<ClipboardButton
				onCopy={() => setHasCopied(true)}
				onFinishCopy={() => setHasFinishedCopying(true)}
				text="https://wordpress.org"
				variant="primary"
			>
				Copy "https://wordpress.org"
			</ClipboardButton>
			<div>
				{hasCopied && !hasFinishedCopying && 'Copying...'}
				{hasFinishedCopying && 'Success!!!!'}
			</div>
		</>
	);
};

export const _default = () => <Example />;
