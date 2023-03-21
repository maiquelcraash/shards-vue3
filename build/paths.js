'use strict'

import path from 'path';
import { fileURLToPath } from 'url';

const Paths = Object.create(null);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

Paths.BASE = path.resolve(__dirname, '..');
Paths.SRC  = path.resolve(Paths.BASE, 'src');
Paths.DIST = path.resolve(Paths.BASE, 'dist');
Paths.INPUT = path.resolve(Paths.SRC, 'index.js');

export default Paths;
