import {defineConfig, mergeConfig, UserConfig} from 'vite'
import base from './_common/base'
import path from "path";

const config: UserConfig = {
  server: {
    port: 3001,
    host: true,
    open: true,

  },
  root: path.resolve(__dirname, '../../app'),
}

export default defineConfig(mergeConfig(base, config))
