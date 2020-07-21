import { pluginScullyHighlight } from './plugin-scully-highlight';
import { HandledRoute } from '@scullyio/scully';

describe('pluginScullyHighlight', () => {
  let html: string;
  let route: HandledRoute;
  beforeEach(() => {
    html = `
      <pre><code>
      const foo = 'foo'
      console.log(foo)
      </code></pre>
    `;
    route = {
      route: '/docs',
      type: 'render',
    };
  });
  it('should work', async () => {
    const render = await pluginScullyHighlight(html, route);
    const doc = document.createElement('pre');
    doc.innerHTML = render;
    expect(doc.querySelector('code').classList.contains('hljs')).toBeTruthy();
  });
});
