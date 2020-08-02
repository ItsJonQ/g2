import { css, space, styled } from '@wp-g2/styles';

export const ModalHeader = css`
	position: relative;
`;

export const ModalTitleView = styled.div`
	font-weight: 600;
	left: 50%;
	line-height: 1;
	margin: 0;
	max-width: 60%;
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
`;

export const ModalCloseButtonView = styled.div`
	position: absolute;
	right: ${space(2)};
	top: 50%;
	transform: translate(0, -50%);
`;
