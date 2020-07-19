import { configure, addDecorator } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
// import { withTests } from '@storybook/addon-jest';

addDecorator(withKnobs);
// addDecorator(withTests);
addDecorator(withA11y);

configure(require.context('../src/lib', true, /\.stories\.(j|t)sx?$/), module);
