// const { codegen } = require('swagger-http-codegen')
const { codegen } = require('../../dist/index.js')

codegen({
  source: require('../swagger.json'),
  methodNameMode: (reqProps) => {
    const data = reqProps.summary.split(' ') || ['', '']
    const name = data[0]
    const packageName = data[1].replace(/service/gi, '')
    if (name.endsWith(packageName)) {
      return name
    }

    return name + packageName
  }
})
