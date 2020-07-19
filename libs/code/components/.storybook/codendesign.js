import { create } from '@storybook/theming/create';

export default create({
  base: 'light',

  colorPrimary: '#414952',
  colorSecondary: '#ffe03b',

  // UI
  appBg: 'white',
  appContentBg: 'white',
  appBorderColor: '#2a3138',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Montserrat", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: 'white',
  barSelectedColor: '#ffe03b',
  barBg: '#414952',

  // Form colors
  inputBg: 'white',
  inputBorder: 'white',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'Code \'N Design storybook',
  brandUrl: 'https://codendesign.web.app',
  brandImage: 'https://codendesign.web.app/images/CodeNDesign.svg',
});
