import { IRequestBody } from '../swaggerInterfaces'
import { isNullOrUndefined } from 'util'
import { refClassName } from '../utils'

export function getRequestBody(requestBody: IRequestBody) {
  // If it is empty, return it directly
  if (!requestBody.content) return

  let imports: string[] = []
  let bodyType = ''

  const allContent = Object.keys(requestBody.content)
  // By default, go to the definition of application/json, if you can’t get it, just take the first one
  let reqBody = requestBody.content['application/json']

  if (!reqBody) {
    reqBody = requestBody.content[allContent[0]]
  }

  if (reqBody == null) {
    return { imports, bodyType }
  }

  if (reqBody.schema) {
    if (reqBody.schema.items) {
      bodyType = refClassName(reqBody.schema.items.$ref)
      if (reqBody.schema.type && reqBody.schema.type === 'array') {
        bodyType += '[]'
      }
    } else if (reqBody.schema.$ref) {
      bodyType = refClassName(reqBody.schema.$ref)
    }
    if (bodyType) {
      imports.push(bodyType)
      bodyType = `
      /** requestBody */
      body?:${bodyType},`
    }
  }

  return { imports, bodyType }
}
