import { defineConfig } from 'vite';
import { resolve } from 'path';
import dtsPlugin from 'vite-plugin-dts';

export default defineConfig(env => {
    const pkgPath = resolve(process.env.PWD, 'package.json');
    const pkg = require(pkgPath);
    const libName = pkg.build?.libName;

    if (libName == null && env.command === 'build') {
        throw new Error(`File ${pkgPath} is missing build.libName parameter; cannot continue`);
    }

    return {
        build: {
            lib: {
                entry: resolve(process.env.PWD, 'lib/index.ts'),
                name: libName,
                fileName: 'index',
                formats: ['es', 'iife', 'cjs']
            }
        },
        plugins: [
            dtsPlugin({
                rollupTypes: true
            })
        ]
    }
})
