const path = require('path');
const fs = require('fs');
const rootPkg = require('../../../lerna.json');
const pkg = require('../package.json');
const pkgLock = require('../package-lock.json');
const { ROOT_DIR } = require('./utils');

const PKG_FILE = path.join(ROOT_DIR, 'package.json');
const PKG_LOCK_FILE = path.join(ROOT_DIR, 'package-lock.json');

async function updateVersion() {
	const rootVersion = rootPkg.version;
	const currentVersion = pkg.version;

	if (rootVersion === currentVersion) {
		console.log('vscode-snippets is update to date.');
		process.exit(0);
	}

	const nextVersion = rootPkg.version;

	pkg.version = nextVersion;
	pkgLock.version = nextVersion;

	const next = JSON.stringify(pkg, null, 2);
	const nextLock = JSON.stringify(pkgLock, null, 2);

	fs.writeFileSync(PKG_FILE, next);
	fs.writeFileSync(PKG_LOCK_FILE, nextLock);

	console.log(`vscode-snippets has been updated to ${nextVersion}`);
}

updateVersion();
