import Joi from '@hapi/joi'
import moment from 'moment'

const now = moment()
const ninetyDaysAgo = moment().add(-90, 'days')


const schema = Joi.object({
  usdAmount: Joi.number().required(),
  date: Joi.date()
    .min(ninetyDaysAgo.format('YYYY-MM-DD'))
    .max(now.format('YYYY-MM-DD'))
    .iso()
}).options({ allowUnknown: true })

export default schema
