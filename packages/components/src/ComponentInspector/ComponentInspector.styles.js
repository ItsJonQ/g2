import { cns, ns, styled } from '@wp-g2/styles';

const [CONNECTED_NAMESPACE] = Object.keys(cns());
const [NAMESPACE] = Object.keys(ns());

const componentSelector = `[${CONNECTED_NAMESPACE}]:not([${NAMESPACE}='Debugger']):not([${NAMESPACE}='ComponentInspector'])`;

export const ComponentInspectorView = styled.div`
	&:not([disabled]) {
		${componentSelector} {
			&:hover {
				outline: 1px solid rgba(0, 0, 255, 0.12) !important;

				${componentSelector} {
					outline: 1px solid rgba(0, 0, 255, 0.12) !important;

					&:hover {
						outline: 1px solid rgba(0, 0, 255, 0.24) !important;
					}
				}
			}
		}
	}
`;
