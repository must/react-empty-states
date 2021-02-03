import Mocha from 'mocha';
import * as path from 'path';

const mocha = new Mocha();
const root = path.join(__dirname, 'src/');

import hook from 'css-modules-require-hook';
import sass from 'node-sass';

hook({
  extensions: [ '.scss' ],
  generateScopedName: '[local]___[hash:base64:5]',
  preprocessCss: (data: string, file: string) => sass.renderSync({ file }).css
});

const test = (file: string) => mocha.addFile(path.join(root, file));

test('test/index.ts');

mocha.run((n: number) => process.exit(Math.min(n, 1)));
