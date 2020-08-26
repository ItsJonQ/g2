import { css, get, styled } from '@wp-g2/styles';

export const AvatarView = styled.div`
	align-items: center;
	background: ${get('lightGray500')};
	display: flex;
	justify-content: center;
	position: relative;
`;

export const border = css`
	box-shadow: 0 0 0 2px ${get('white')};
`;
