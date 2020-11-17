import { download } from '@wordpress/icons';
import React from 'react';

import { TextInput } from '../../index';
import { BlankSlate } from '../index';

export default {
	component: BlankSlate,
	title: 'Components/BlankSlate',
};

export const _default = () => {
	return (
		<BlankSlate
			description="Input your twitter URL"
			icon={download}
			title="Twitter Embed"
		>
			<TextInput type="text" />
		</BlankSlate>
	);
};
