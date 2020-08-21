import { styled } from '@wp-g2/styles';

export const ComponentDebuggerView = styled.div`
	&:not([disabled]) {
		[data-g2-component]:not([data-g2-component='Debugger']) {
			&:hover {
				outline: 1px solid rgba(255, 0, 0, 0.2) !important;

				[data-g2-component]:not([data-g2-component='Debugger']) {
					outline: 1px solid rgba(255, 0, 0, 0.2) !important;

					&:hover {
						outline: 1px solid rgba(255, 0, 0, 0.4) !important;
					}
				}
			}
		}
	}
`;
