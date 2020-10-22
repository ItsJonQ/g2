import { contextConnect, useContextSystem } from '@wp-g2/context';
import { shallowCompare, useSubState } from '@wp-g2/substate';
import { useUpdateEffect } from '@wp-g2/utils';
import React from 'react';

import { Panel, PanelBody, PanelHeader } from '../Panel';
import { AccordionContext } from './Accordion.Context';
import { AccordionView } from './Accordion.styles';
import * as styles from './Accordion.styles';

function Accordion(props, forwardedRef) {
	const { allowMultiple = false, ...otherProps } = useContextSystem(
		props,
		'Accordion',
	);

	const store = useSubState(
		(set) => ({
			states: {},
			// Actions
			update: ({ id, visible = false }) => {
				const prevVisible = store.getState().getVisibleState({ id });
				if (prevVisible === visible) return;

				set((prev) => {
					let nextStates = { ...prev.states };

					if (typeof nextStates[id] === undefined) {
						nextStates[id] = visible;
					}

					if (!allowMultiple) {
						nextStates = Object.keys(nextStates).reduce(
							(next, key) => {
								return {
									...next,
									[key]: key === id && visible ? true : false,
								};
							},
							{},
						);
					}

					console.log('update', id, prevVisible, visible, nextStates);

					return { states: nextStates };
				});
			},
			register: ({ id, visible = false }) => {
				store.getState().update({ id, visible });
			},
			unregister: ({ id }) => {
				set((prev) => {
					const nextStates = { ...prev.states };
					delete nextStates[id];
					return { states: nextStates };
				});
			},

			// Hooks
			useRegister: (initial) => {
				React.useEffect(() => {
					store.getState().register(initial);
					return () => store.getState().unregister(initial);
				}, [initial]);
			},
			useAccordionState: ({ id, visible }) => {
				store.getState().useRegister({ id, visible });

				// const state = store.getState().getVisibleState({ id });
				const state = store((prev) => prev.states[id], shallowCompare);
				const setState = React.useCallback(
					(next) => {
						store.getState().update({ id, visible: next });
					},
					[id],
				);

				// Sync controlled state
				// useUpdateEffect(() => {
				// 	setState(visible);
				// }, [setState, visible]);

				return [state, setState];
			},
			// Selectors
			getVisibleState: ({ id }) => {
				return !!store.getState().states[id];
			},
		}),
		[],
	);

	const contextValue = React.useMemo(
		() => ({
			store,
			useAccordionState: store.getState().useAccordionState,
		}),
		[store],
	);

	return (
		<AccordionContext.Provider value={contextValue}>
			<AccordionView>
				<Panel>
					<PanelHeader>Hello</PanelHeader>
					<PanelBody>Content</PanelBody>
				</Panel>
				<Panel>
					<PanelHeader>Hello</PanelHeader>
					<PanelBody>Content</PanelBody>
				</Panel>
			</AccordionView>
		</AccordionContext.Provider>
	);
}

export default contextConnect(Accordion, 'Accordion');
