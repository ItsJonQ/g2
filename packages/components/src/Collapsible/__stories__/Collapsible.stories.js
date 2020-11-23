import React from 'react';

import { Button } from '../../button';
import { Placeholder } from '../../Placeholder';
import { Surface } from '../../Surface';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../index';

export default {
	component: Collapsible,
	title: 'Components/Collapsible',
};

export const _default = () => {
	return (
		<Collapsible css={{ height: 400, width: 300 }}>
			<CollapsibleTrigger as={Button}>Toggle</CollapsibleTrigger>
			<CollapsibleContent>
				<Surface>
					<Placeholder height={500} />
				</Surface>
			</CollapsibleContent>
		</Collapsible>
	);
};
