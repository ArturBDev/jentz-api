const esbuild = require('esbuild');
const path = require('path');
const pkg = require('./package.json');

const dependencies = Object.keys(pkg.dependencies || {}).concat(
  Object.keys(pkg.devDependencies || {})
);

esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node14',
  outfile: 'dist/main.js',
  external: dependencies,
  loader: {
    '.json': 'json',
    '.ts': 'ts',
  },
}).catch(() => process.exit(1));