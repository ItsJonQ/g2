import { css, styled, ui } from '@wp-g2/styles';

export const AvatarView = styled.div`
	align-items: center;
	background: ${ui.get('lightGray500')};
	display: flex;
	justify-content: center;
	overflow: hidden;
	position: relative;
`;

export const border = css`
	box-shadow: 0 0 0 2px ${ui.get('white')};
`;
