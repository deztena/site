import {defineConfig, mergeConfig, UserConfig} from 'vite'
import base from '../_common/base'
import path from "path";

const config: UserConfig = {
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, '../../../app/tilda'),
      },
    },
    outDir: path.resolve(__dirname, '../../../public/tilda'),
  }
}

export default defineConfig(mergeConfig(base, config))
