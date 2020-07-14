module.exports = {
  name: 'demo-playground',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/demo/playground',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
