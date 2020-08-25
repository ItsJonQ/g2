import { cns, ns, styled } from '@wp-g2/styles';

const [CONNECTED_NAMESPACE] = Object.keys(cns());
const [NAMESPACE] = Object.keys(ns());

const connectedComponentSelector = `[${CONNECTED_NAMESPACE}]:not([${NAMESPACE}='Debugger']):not([${NAMESPACE}='ComponentInspector'])`;
const namespacedComponentSelector = `[${NAMESPACE}]:not([${NAMESPACE}='Debugger']):not([${NAMESPACE}='ComponentInspector'])`;

export const ComponentInspectorView = styled.div`
	&:not([disabled]) {
		&:hover {
			${namespacedComponentSelector} {
				outline: 1px solid rgba(255, 0, 0, 0.12);
			}
		}

		${connectedComponentSelector} {
			&:hover {
				outline: 1px solid rgba(0, 180, 255, 0.2) !important;

				${connectedComponentSelector} {
					outline: 1px solid rgba(0, 180, 255, 0.2) !important;

					&:hover {
						outline: 1px solid rgba(0, 180, 255, 0.3) !important;
					}
				}
			}
		}
	}
`;
