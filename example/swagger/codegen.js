// const { codegen } = require('swagger-http-codegen')
const { codegen } = require('../../dist/index.js')

codegen({
  source: require('../swagger.json'),
  // remoteUrl: 'http://localhost:44307/swagger/v1/swagger.json',
  outputDir: './swagger/services',
  strictNullChecks: false,
  // useCustomerRequestInstance: true,
  modelMode: 'interface',
  extendDefinitionFile: './swagger/customerDefinition.ts',
  extendGenericType: ['JsonResult'],
  methodNameMode: 'path'
  // sharedServiceOptions: true,
})
