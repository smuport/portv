module.exports = {
  name: 'canvas',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/canvas',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
