import {UserConfig, Plugin} from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import twig from "twig";
import path from "path";
import fs from "fs";

const fileRegex = /\.(twig)$/


twig.cache(false);


function myPlugin() {
  return {
    name: 'transform-file',

    transform(twigFileContent, path) {

      if (fileRegex.test(path)) {
        const output = [
          'import twig from "twig"',
          "const template = twig.twig(" + JSON.stringify({
            data: twigFileContent,
          }) + ");",
          "export default function(context) { return template.render(context); }",
        ]

        return {
          code: output.join('\n'),
          map: null, // provide source map if available
        }
      }
    },
  }
}

const generateHtml: (options: {layout: string}) => Plugin = ({layout})  => {
  return {
    name: 'generate-html',

    generateBundle(options, bundle) {
      const t = twig.twig({
        data: fs.readFileSync(layout).toString(),
      })

      const JS_CHUNK_LINKS = Object.keys(bundle).reduce((acc: string[], chunkName) => {
        if (bundle[chunkName].type === 'chunk' && !bundle[chunkName].isEntry) {
          acc.push(`<link rel="preload" href="${bundle[chunkName].fileName}" as="script">`)
        }

        return acc
      }, []).join('')

      const JS_CHUNKS = Object.keys(bundle).reduce((acc: string[], chunkName) => {
        if (bundle[chunkName].type === 'chunk' && bundle[chunkName].isEntry) {
          acc.push(`<script defer src="${bundle[chunkName].fileName}"></script>`)
        }

        return acc
      }, []).join('')

      this.emitFile({
        type: 'asset',
        fileName: `${path.parse(layout).name}.html`,
        source: t.render({
          JS_CHUNKS,
          JS_CHUNK_LINKS,
        }, {}, false)
      })
    }
  }
}

const config: UserConfig = {
  plugins: [myPlugin(),  cssInjectedByJsPlugin(), generateHtml({
    layout: path.resolve(__dirname, '../../../app/tilda/index.twig')
  })],
}

export default config

