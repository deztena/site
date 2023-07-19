import {UserConfig} from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import twig from "twig";

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

const config: UserConfig = {
  plugins: [myPlugin(),  cssInjectedByJsPlugin()],
}

export default config

