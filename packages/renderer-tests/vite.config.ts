import baseConfig from '../../vite.config.base.ts';
import { defineConfig, UserConfigFn } from 'vite';

export default defineConfig(env => (baseConfig as UserConfigFn)(env));
