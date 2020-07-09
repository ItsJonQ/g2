import { createContext, useContext } from 'react';

export const NavigationStackContext = createContext({});
export const useNavigationStackContext = () =>
	useContext(NavigationStackContext);

export function usePositionPanels() {
	const {
		__isRendered,
		autoHeight,
		containerRef,
	} = useNavigationStackContext();
	const currentPanelNode = useCurrentPanelNode();
	const panelNodes = usePanelNodes();
	const containerNode = containerRef.current;

	panelNodes.forEach((panel) => {
		panel.removeAttribute('hidden');
		panel.style.display = 'block';
		panel.style.width = '100%';
	});

	if (__isRendered && autoHeight && containerNode) {
		containerNode.style.height = `${currentPanelNode?.children[0].clientHeight}px`;
	}
}

export function useTab() {
	const { tab } = useNavigationStackContext();

	return tab;
}

export function usePanelNodes() {
	const { panels } = useTab();

	return panels.map((panel) => panel?.ref?.current);
}

export function useCurrentPanelNode() {
	const { currentId, panels } = useTab();
	const panel = panels.find((panel) => panel.groupId === currentId);

	return panel ? panel.ref.current : null;
}

export function useCurrentPanelIndex() {
	const { currentId, panels } = useTab();
	const panel = panels.find((panel) => panel.groupId === currentId);
	const index = panels.indexOf(panel);

	return index < 0 ? 0 : index;
}

export function useIsNextEnabled() {
	const { currentId, loop, panels } = useTab();

	return loop || panels[panels.length - 1]?.groupId !== currentId;
}

export function useIsPreviousEnabled() {
	const { currentId, loop, panels } = useTab();

	return loop || panels[0]?.groupId !== currentId;
}
