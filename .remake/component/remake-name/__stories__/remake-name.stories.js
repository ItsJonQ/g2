import React from 'react';

import { ComponentInspector } from '../../index';
import { <%= name %> } from '../index';

export default {
	component: <%= name %>,
	title: 'Components/<%= name %>',
};

export const _default = () => {
	return (
		<ComponentInspector visible={false}>
			<<%= name %> />
		</ComponentInspector>
	);
};
