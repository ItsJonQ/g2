import { ns } from '@wp-g2/styles';
import { is, noop } from '@wp-g2/utils';

import coreRules from './rules';
import { isBrowser } from './utils';

const [COMPONENT_NAMESPACE] = Object.keys(ns());

const __rules = {};

function addRules(set) {
	if (!is.plainObject(set)) return;
	const rules = Object.keys(set);

	for (const rule of rules) {
		const entry = set[rule];
		if (!__rules[rule]) {
			__rules[rule] = entry;
		}
	}
}

function getRules() {
	return Object.entries(__rules);
}

function getAllNodes() {
	if (!isBrowser) return;

	return Array.from(document.querySelectorAll(`[${COMPONENT_NAMESPACE}]`));
}

addRules(coreRules);

export function process({ onReport } = { onReport: noop }) {
	const rules = getRules();
	if (!rules.length) return;

	const nodes = getAllNodes();

	const getComponentName = (node) => node?.getAttribute(COMPONENT_NAMESPACE);
	const isComponent = (node) => !!getComponentName(node);
	const getClosestComponent = (node, name) =>
		node.closest(`[${COMPONENT_NAMESPACE}="${name}"]`);

	const handleOnReport = (name, __node) => (props) => {
		const { message, node, title } = props;
		if (!message) return;

		const report = {
			node: node || __node,
			message,
			name,
			title,
		};

		onReport(report);
	};

	const context = {};

	for (const node of nodes) {
		for (const rule of rules) {
			const [name, fns] = rule;
			if (typeof fns.create === 'function') {
				context.report = handleOnReport(name, node);
				fns.create(context)(node, {
					getComponentName,
					isComponent,
					getClosestComponent,
				});
			}
		}
	}
}
