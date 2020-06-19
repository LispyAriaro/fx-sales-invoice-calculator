import express from 'express'
import dotenv from 'dotenv'

if(process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

import helmet from 'helmet'
import bodyParser from 'body-parser'
import routes from './src/routes'

let app: express.Application = express()


app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set("view options", {layout: false})
app.use(express.static(__dirname + '/web'))

app.set('views', __dirname + '/web')

app.use('/', routes)

export default app
