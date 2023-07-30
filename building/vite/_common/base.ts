import {mergeConfig, UserConfig} from 'vite'
import plugins from './plugins'
import {getBabelOutputPlugin, babel} from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import path from "path";

const config: UserConfig = {
  build: {
    emptyOutDir: true,
    manifest: true,
    ssrManifest: true,
    rollupOptions: {
      plugins: [nodeResolve(), babel({
        configFile: path.resolve(__dirname, '../../../babel.config.js'),
      })],
      external: ['jquery'],
      output: {
        format: 'amd',
        entryFileNames: 'entry-[name].js',
        chunkFileNames: 'chunk-[name].js',
        amd: {
          autoId: true,
          basePath: '',
          define: 'deztenaRuntime.define'
        },
        globals: {
          jquery: '$'
        },
        inlineDynamicImports: false,
        manualChunks (id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }

          return undefined
        },
        plugins: [getBabelOutputPlugin({
          configFile: path.resolve(__dirname, '../../../babel.config.js'),
          allowAllFormats: true,
          minified: true
        }), terser()]
      }
    }
  }
}

export default mergeConfig(plugins, config)
