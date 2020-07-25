import {
  registerPlugin,
  HandledRoute,
  log,
  white,
  yellow,
  green,
} from '@scullyio/scully';
import * as posthtml from 'posthtml';
import highlight from 'posthtml-highlight';

export const PluginScullyHighlight = 'plugin-scully-highlight';
registerPlugin('render', PluginScullyHighlight, pluginScullyHighlight);

export async function pluginScullyHighlight(
  docs: string,
  route: HandledRoute
): Promise<string> {
  if (route.route.indexOf('/docs') === 0) {
    log(`${yellow('C💧de')} ${white('✔︎')} ${green('highlight')}`);
    return posthtml([
      highlight({
        inline: true,
        useBR: true,
      }),
    ])
      .process(docs)
      .then(({ html, messages = [] }) => {
        if (!!messages.length) {
          // messages.forEach(yellow);
        }
        return html.replace(/&amp;lt;/g, '&lt;').replace(/&amp;gt;/g, '&gt;');
      });
  }
}
