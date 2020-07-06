import { BaseView } from '@g2/css';
import { connect } from '@g2/provider';
import { useUpdateEffect } from '@g2/utils';
import React, { useRef } from 'react';
import { Tab, TabList, TabPanel, useTabState } from 'reakit/Tab';
import { VisuallyHidden } from 'reakit/VisuallyHidden';

import { Button } from '../Button';
import { Card, CardBody, CardFooter, CardHeader } from '../Card';
import { InputControl } from '../InputControl';
import { Placeholder } from '../Placeholder';
import { Spacer } from '../Spacer';
import { Text } from '../Text';
import {
	NavigationStackContext,
	useNavigationStackContext,
} from './NavigationStack.utils';

function NavigationStackScreenNext(props) {
	const { tab } = useNavigationStackContext();
	return <Button onClick={() => tab.next()} {...props} />;
}

function NavigationStackScreenPrevious(props) {
	const { tab } = useNavigationStackContext();
	return <Button onClick={() => tab.previous()} {...props} />;
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

function NavigationStackScreen({ children, ...props }) {
	const { containerRef, tab } = useNavigationStackContext();
	const nodeRef = useRef();
	const currentPanelNode = useCurrentPanelNode();
	const containerNode = containerRef.current;

	if (containerNode && currentPanelNode === nodeRef.current) {
		containerNode.style.height = `${nodeRef.current.children[0].clientHeight}px`;
	}

	return (
		<TabPanel
			{...tab}
			{...props}
			style={{
				display: 'block',
				outline: 'none',
			}}
		>
			<BaseView ref={nodeRef}>{children}</BaseView>
		</TabPanel>
	);
}

function Example() {
	return (
		<>
			<NavigationStackScreen>
				<CardHeader>NavigationStack</CardHeader>
				<CardBody>
					<ul>
						<li>Content is split by panes</li>
						<li>Left to Right transitions</li>
						<li>Auto height resize</li>
					</ul>
				</CardBody>
				<CardFooter justify="flex-end">
					<NavigationStackScreenNext>Next</NavigationStackScreenNext>
				</CardFooter>
			</NavigationStackScreen>
			<NavigationStackScreen>
				<CardHeader>Tab 1</CardHeader>
				<CardBody>
					<Spacer>
						<Text>Form</Text>
						<InputControl />
					</Spacer>
				</CardBody>
				<CardFooter justify="flex-end">
					<NavigationStackScreenPrevious>
						Previous
					</NavigationStackScreenPrevious>
					<NavigationStackScreenNext>Next</NavigationStackScreenNext>
				</CardFooter>
			</NavigationStackScreen>
			<NavigationStackScreen>
				<CardHeader>Tab 2</CardHeader>
				<CardBody>
					<Spacer>
						<Text>Form</Text>
						<InputControl />
					</Spacer>
					<Spacer>
						<Text>Form</Text>
						<InputControl />
					</Spacer>
					<Spacer>
						<Text>Form</Text>
						<InputControl />
					</Spacer>
				</CardBody>
				<CardFooter justify="flex-end">
					<NavigationStackScreenPrevious>
						Previous
					</NavigationStackScreenPrevious>
					<NavigationStackScreenNext>Next</NavigationStackScreenNext>
				</CardFooter>
			</NavigationStackScreen>
			<NavigationStackScreen>
				<CardHeader>Tab 3</CardHeader>
				<CardBody>
					<Spacer>
						<Placeholder height={300} />
					</Spacer>
					<Spacer>
						<Text>Form</Text>
						<InputControl />
					</Spacer>
					<Spacer>
						<Text>Form</Text>
						<InputControl />
					</Spacer>
				</CardBody>
				<CardFooter justify="flex-end">
					<NavigationStackScreenPrevious>
						Previous
					</NavigationStackScreenPrevious>
					<NavigationStackScreenNext>Next</NavigationStackScreenNext>
				</CardFooter>
			</NavigationStackScreen>
		</>
	);
}

function usePositionPanels() {
	const { containerRef } = useNavigationStackContext();
	const currentPanelNode = useCurrentPanelNode();
	const panelNodes = usePanelNodes();
	const containerNode = containerRef.current;

	panelNodes.forEach((panel) => {
		panel.removeAttribute('hidden');
		panel.style.display = 'block';
		panel.style.width = '100%';
	});

	if (containerNode) {
		containerNode.style.height = `${currentPanelNode?.children[0].clientHeight}px`;
	}
}

function usePanelNodes() {
	const { tab } = useNavigationStackContext();
	const { panels } = tab;

	return panels.map((panel) => panel?.ref?.current);
}

function useCurrentPanelNode() {
	const { tab } = useNavigationStackContext();
	const { currentId, panels } = tab;
	const panel = panels.find((panel) => panel.groupId === currentId);

	return panel ? panel.ref.current : null;
}

function useCurrentPanelIndex() {
	const { tab } = useNavigationStackContext();
	const { currentId, panels } = tab;
	const panel = panels.find((panel) => panel.groupId === currentId);

	return panels.indexOf(panel);
}

function useOnNavigationStackChange(callback) {
	const { tab } = useNavigationStackContext();
	const { selectedId } = tab;

	const handleOnChange = () => {
		if (selectedId) {
			console.log(tab);
			callback(selectedId);
		}
	};

	useUpdateEffect(handleOnChange, [selectedId]);
}

function NavigationScreenWrapper({ children }) {
	const currentIndex = useCurrentPanelIndex();
	const { tab } = useNavigationStackContext();
	const { panels } = tab;
	const panelsCount = panels.length;
	const offset = 100 / panelsCount;
	const x = `calc(${offset * currentIndex * -1}%)`;

	return (
		<BaseView
			style={{
				transform: `translate3d(${x}, 0, 0)`,
				width: `calc(100% * ${panelsCount})`,
			}}
			sx={{
				display: 'flex',
				transition: 'transform 200ms ease',
			}}
		>
			{children}
		</BaseView>
	);
}

function NavigationStackController() {
	usePositionPanels();

	return null;
}
function NavigationStack() {
	const tab = useTabState({ loop: false });
	const containerRef = useRef();

	const contextValue = {
		containerRef,
		tab,
	};

	return (
		<Card sx={{ margin: 'auto', width: 400 }}>
			<NavigationStackContext.Provider value={contextValue}>
				<NavigationStackController />
				<NavigationStackList />
				<BaseView
					ref={containerRef}
					sx={{
						height: 200,
						overflow: 'hidden',
						position: 'relative',
						transition: 'height 200ms ease',
					}}
				>
					<NavigationScreenWrapper>
						<Example />
					</NavigationScreenWrapper>
				</BaseView>
			</NavigationStackContext.Provider>
		</Card>
	);
}

export default connect(NavigationStack);
