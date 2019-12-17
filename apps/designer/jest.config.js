module.exports = {
  name: 'designer',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/designer',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
