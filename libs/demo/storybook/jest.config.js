module.exports = {
  name: 'demo-storybook',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/demo/storybook',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
