import baseConfig from '../../vite.config.base';
import { defineConfig, mergeConfig, UserConfigFn } from 'vite';

export default defineConfig(env => mergeConfig((baseConfig as UserConfigFn)(env), {
    build: {
        rollupOptions: {
            external: ['axios'],
            output: {
                globals: {
                    axios: 'axios'
                }
            }
        }
    }
}))
