import {defineConfig} from 'rollup'
import path from "path";
import {nodeResolve} from "@rollup/plugin-node-resolve";
import {babel, getBabelOutputPlugin} from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";


export default defineConfig({
  input: path.resolve(__dirname, '../../app/_common/runtime'),
  plugins: [nodeResolve(), babel({
    configFile: path.resolve(__dirname, '../../babel.config.js'),
  })],
  output: [
    {
      format: 'iife',
      name: 'deztenaRuntime',
      file: path.resolve(__dirname, '../../public/runtime.js'),
      plugins: [getBabelOutputPlugin({
        configFile: path.resolve(__dirname, '../../babel.config.js'),
        allowAllFormats: true,
        minified: true
      }), terser()]
    }
  ]
})

