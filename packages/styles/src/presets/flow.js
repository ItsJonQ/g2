import { flow as baseFlow } from '../mixins/flow';

export const flow = baseFlow;

flow.calc = (...args) => `calc(${baseFlow(...args)})`;
