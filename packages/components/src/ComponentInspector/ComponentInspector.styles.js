import { cns, ns, styled } from '@wp-g2/styles';

const [CONNECTED_NAMESPACE] = Object.keys(cns());
const [NAMESPACE] = Object.keys(ns());

export const ComponentInspectorView = styled.div`
	&:not([disabled]) {
		[${CONNECTED_NAMESPACE}]:not([${NAMESPACE}='Debugger']) {
			&:hover {
				outline: 1px solid rgba(0, 0, 255, 0.12) !important;

				[${CONNECTED_NAMESPACE}]:not([${NAMESPACE}='Debugger']) {
					outline: 1px solid rgba(0, 0, 255, 0.12) !important;

					&:hover {
						outline: 1px solid rgba(0, 0, 255, 0.24) !important;
					}
				}
			}
		}
	}
`;
