import { useContextSystem } from '@wp-g2/context';
import { css, cx, space, ui } from '@wp-g2/styles';
import { is } from '@wp-g2/utils';

export function useSpacer(props) {
	const {
		className,
		m,
		mb = 2,
		ml,
		mr,
		mt,
		mx,
		my,
		p,
		pb,
		pl,
		pr,
		pt,
		px,
		py,
		...otherProps
	} = useContextSystem(props, 'Spacer');

	const classes = cx(
		is.defined(mt) &&
			css`
				margin-top: ${space(mt)};
			`,
		is.defined(mb) &&
			css`
				margin-bottom: ${space(mb)};
			`,
		is.defined(ml) &&
			css`
				${ui.margin.start(space(ml))}
			`,
		is.defined(mr) &&
			css`
				${ui.margin.end(space(mr))}
			`,
		is.defined(mx) &&
			css`
				${ui.margin.x(space(mx))}
			`,
		is.defined(my) &&
			css`
				margin-bottom: ${space(my)};
				margin-top: ${space(my)};
			`,
		is.defined(m) &&
			css`
				margin: ${space(m)};
			`,
		is.defined(pt) &&
			css`
				padding-top: ${space(pt)};
			`,
		is.defined(pb) &&
			css`
				padding-bottom: ${space(pb)};
			`,
		is.defined(pl) &&
			css`
				${ui.padding.start(space(pl))}
			`,
		is.defined(pr) &&
			css`
				${ui.padding.end(space(pr))}
			`,
		is.defined(px) &&
			css`
				${ui.padding.x(space(px))}
			`,
		is.defined(py) &&
			css`
				padding-bottom: ${space(py)};
				padding-top: ${space(py)};
			`,
		is.defined(p) &&
			css`
				padding: ${space(p)};
			`,
		className,
	);

	return { ...otherProps, className: classes };
}
