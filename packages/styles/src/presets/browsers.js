import { firefoxOnly, ieOnly, safariOnly } from '../mixins/browsers';

/** @type {{ ie: typeof ieOnly; firefox: typeof firefoxOnly; safari: typeof safariOnly }} */
export const browsers = {};

browsers.ie = ieOnly;
browsers.firefox = firefoxOnly;
browsers.safari = safariOnly;
