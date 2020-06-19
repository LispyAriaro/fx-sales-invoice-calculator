import { Request, Response } from 'express'
import axios, { AxiosResponse } from 'axios'
import calculateCadInvoiceSchema from '../schemas/dto/calculateCadInvoice'
import { validate, sendFailureWithStatus } from '../utils/core'

import Rest from '../enums/Rest'
import { ErrorMessages } from '../enums/ErrorMessages'


export const calculateInvoice = async (req: Request, res: Response) => {
  if(!process.env.CURRENCY_LAYER_API_ACCESS_KEY) {
    return sendFailureWithStatus(res, "Sorry, there was a server mis-configuration.", 500)
  }

  const validationResult = validate(calculateCadInvoiceSchema, req.body)
  if (validationResult) {
    return res.json({ status: false, errors: validationResult })
  }

  const { usdAmount, date } = req.body
  const apiAccessKey = process.env.CURRENCY_LAYER_API_ACCESS_KEY

  const baseURL = `http://api.currencylayer.com/historical?access_key=${apiAccessKey}&date=${date}&currencies=CAD&format=1`

  try {
    const response: AxiosResponse<any> = await axios.get(baseURL)

    if (response.status !== 200 || !response.data) {
      throw new Error('Sorry, verification failed! Please try again.')
    }
    const { success, quotes } = response.data

    if(success) {
      let output = {}
      output[Rest.STATUS] = true
      output[Rest.MESSAGE] = ''
      output[Rest.DATA] = {invoiceInCad: quotes.USDCAD * usdAmount}

      return res.json(output)
    } else {
      return sendFailureWithStatus(res, ErrorMessages.FX_RATE_NOT_FOUND, 500)
    }
  } catch (e) {
    console.log(e)

    return sendFailureWithStatus(res, e.message, 500)
  }
}
