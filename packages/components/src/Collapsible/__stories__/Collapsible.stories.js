import React from 'react';

import { Button } from '../../Button';
import { Placeholder } from '../../Placeholder';
import { Surface } from '../../Surface';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../index';

export default {
	component: Collapsible,
	title: 'Components/Collapsible',
};

export const _default = () => {
	return (
		<Collapsible sx={{ height: 400, width: 300 }}>
			<CollapsibleTrigger as={Button}>Toggle</CollapsibleTrigger>
			<CollapsibleContent>
				<Surface p={3}>
					<Placeholder height={500} />
				</Surface>
			</CollapsibleContent>
		</Collapsible>
	);
};
