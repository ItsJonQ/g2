import { firefoxOnly, ieOnly, safariOnly } from '../mixins/browsers';

export const browsers = {};

browsers.ie = ieOnly;
browsers.firefox = firefoxOnly;
browsers.safari = safariOnly;
