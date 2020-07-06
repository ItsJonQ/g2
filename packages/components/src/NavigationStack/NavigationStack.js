import { connect } from '@g2/provider';
import { useUpdateEffect } from '@g2/utils';
import React from 'react';
import { Tab, TabList, TabPanel, useTabState } from 'reakit/Tab';
import { VisuallyHidden } from 'reakit/VisuallyHidden';

import {
	NavigationStackContext,
	useNavigationStackContext,
} from './NavigationStack.utils';

function NextButton() {
	const { tab } = useNavigationStackContext();
	return <button onClick={() => tab.next()}>Next</button>;
}

function PreviousButton() {
	const { tab } = useNavigationStackContext();
	return <button onClick={() => tab.previous()}>Previous</button>;
}

function NavigationStackList() {
	const { tab } = useNavigationStackContext();
	const { panels } = tab;
	return (
		<VisuallyHidden>
			<TabList
				{...tab}
				aria-hidden="true"
				aria-label="Navigation TabList"
			>
				{panels.map((panel) => (
					<Tab {...tab} key={panel.id} />
				))}
			</TabList>
		</VisuallyHidden>
	);
}

function NavigationStackScreen(props) {
	const { tab } = useNavigationStackContext();
	return <TabPanel {...tab} {...props} />;
}

function Example() {
	return (
		<>
			<NavigationStackScreen>
				Tab 1
				<PreviousButton />
				<NextButton />
			</NavigationStackScreen>
			<NavigationStackScreen>
				Tab 2
				<PreviousButton />
				<NextButton />
			</NavigationStackScreen>
			<NavigationStackScreen>
				Tab 3
				<PreviousButton />
				<NextButton />
			</NavigationStackScreen>
			<NavigationStackScreen>
				Tab 4
				<PreviousButton />
				<NextButton />
			</NavigationStackScreen>
		</>
	);
}

function useOnNavigationStackChange(callback) {
	const { tab } = useNavigationStackContext();
	const { selectedId } = tab;
	const handleOnChange = () => {
		if (selectedId) {
			callback(selectedId);
		}
	};
	useUpdateEffect(handleOnChange, [selectedId]);
}

function NavigationStackController() {
	useOnNavigationStackChange((id) => console.log(id));

	return null;
}
function NavigationStack() {
	const tab = useTabState();
	const contextValue = {
		tab,
	};

	return (
		<NavigationStackContext.Provider value={contextValue}>
			<NavigationStackController />
			<NavigationStackList />
			<Example />
		</NavigationStackContext.Provider>
	);
}

export default connect(NavigationStack);
