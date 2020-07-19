import { addons } from '@storybook/addons';
import codendesign from './codendesign';
import { withA11y } from '@storybook/addon-a11y';

addons.setConfig({
  theme: codendesign,
  addons: [
    withA11y
  ]
});
