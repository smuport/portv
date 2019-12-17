module.exports = {
  name: 'html',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/html',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
