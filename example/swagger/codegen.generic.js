// const { codegen } = require('swagger-http-codegen')
const { codegen } = require('../../dist/index.js')

codegen({
  methodNameMode: 'path',
  source: require('../swaggerGeneric.json'),
  // remoteUrl: 'http://localhost:44307/swagger/v1/swagger.json',
  outputDir: './swagger/services',
  fileName: 'indexGeneric.ts',
  strictNullChecks: false,
  modelMode: 'interface'
})
