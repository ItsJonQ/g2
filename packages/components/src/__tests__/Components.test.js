import { render } from '@testing-library/react';
import { ns } from '@wp-g2/context';
import React from 'react';

import * as Components from '../index';

const [NAMESPACE] = Object.keys(ns());

const excludeList = [
	'Alerts',
	'Collapsible',
	'CollapsibleContent',
	'CollapsibleTrigger',
	'ColorField',
	'ColorPicker',
	'ColorSwatch',
	'MediaQuery',
	'NavigationStack',
	'NavigationStackNext',
	'NavigationStackPrevious',
	'NavigationStackScreen',
	'NavigationStackScreens',
	'Navigator',
	'NavigatorBack',
	'NavigatorLink',
	'NavigatorRouter',
	'NavigatorScreen',
	'NavigatorScreens',
	'NavigatorSwitch',
	'PanelBody',
	'PanelHeader',
	'Portal',
	'SlotFill',
	'Sortable',
];

const TestableComponents = Object.entries(Components).filter(([key, value]) => {
	// A quick test to see if the value is a React component.
	return (
		value.$$typeof &&
		value.__wpComponentsKey__ &&
		!key.includes('Context') &&
		!excludeList.includes(key)
	);
});

describe('props', () => {
	test.each(TestableComponents)(`should render %s`, (name, Component) => {
		const { container } = render(<Component id={name} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test.each(TestableComponents)(
		`should render %s with css prop`,
		(name, Component) => {
			const { container } = render(
				<>
					<Component id={name} />
					<Component
						css={[
							`
							background: red;
						`,
							{ padding: 27 },
						]}
						id={name}
					/>
				</>,
			);
			const [first, second] = container.querySelectorAll(
				`[${NAMESPACE}="${name}"]`,
			);

			if (second) {
				const firstClasses = first.classList.toString();
				const secondClasses = second.classList.toString();

				expect(firstClasses).not.toEqual(secondClasses);
				expect(first).toMatchSnapshot();
				expect(second).toMatchSnapshot();
			}
		},
	);
});
