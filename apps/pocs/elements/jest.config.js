module.exports = {
  name: 'pocs-elements',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/pocs/elements',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
