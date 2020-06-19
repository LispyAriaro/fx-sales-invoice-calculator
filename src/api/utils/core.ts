import { Response } from 'express'
import Rest from '../enums/Rest'


export const PASSWORD_HASH_SALT_ROUNDS = 10


export const validate = (joiSchema, object) => {
  const validationResults = joiSchema.validate(object)
  if (!validationResults.error) {
    return null
  }

  return validationResults.error.details.map(errorDetails => {
    return {
      field: errorDetails.context.key,
      message: errorDetails.message,
    }
  })
}

export const sendFailure = (res: Response, errMsg: string) => {
  var response = {}
  response[Rest.STATUS] = false
  response[Rest.MESSAGE] = errMsg
  return res.json(response)
}

export const sendFailureWithStatus = (res: Response, errMsg: string, resCode: number) => {
  var response = {}
  response[Rest.STATUS] = false
  response[Rest.MESSAGE] = errMsg
  return res.status(resCode).json(response)
}
