import { cx, fx } from '@wp-g2/system';
import React from 'react';

export default {
	title: 'Example/System',
};

const Example = () => {
	// Meaning of functional style API

	// f1     = fontSize1      = h1     = 3em
	// lhBase = lineHeightBase          = 1
	// fw2    = fontWeight2             = 200
	// fw8@md = fontWeight8             = 800       = @media (min-width: 48em)

	const classes = cx(fx`
        f1
        lhBase
        fw8@md
        fw2
    `);

	return <div className={classes}>Example</div>;
};

export const _default = () => {
	return <Example />;
};
