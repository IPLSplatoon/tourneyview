import baseConfig from '../../vite.config.base';
import { defineConfig, mergeConfig, UserConfigFn } from 'vite';

export default defineConfig(env => mergeConfig((baseConfig as UserConfigFn)(env), {
    build: {
        rollupOptions: {
            external: ['d3'],
            output: {
                globals: {
                    d3: 'd3'
                }
            }
        }
    }
}))
