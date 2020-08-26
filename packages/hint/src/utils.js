import { is } from '@wp-g2/utils';

export const isBrowser = is.defined(window) && is.defined(document);
