import { css, styled, ui } from '@wp-g2/styles';

export const ListView = styled.ul`
	list-style: disc outside none;
	margin: 0;
	padding: 0;
	${ui.padding.start(ui.space(4))}
`;

export const ListItemView = styled.li`
	margin: 0;
	margin-bottom: ${ui.space(2)};

	&:last-child {
		margin-bottom: 0;
	}
`;

export const ordered = css`
	list-style: decimal outside none;
	${ui.padding.start(ui.space(6))}
`;
